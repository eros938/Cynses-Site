import socket, threading, time, os, sys

LPORT = 4444
CMD_FILE = r"D:\test\checkpoint\cmd.txt"
OUT_FILE = r"D:\test\checkpoint\shell_out.txt"

# reset files
open(OUT_FILE, "w").close()
open(CMD_FILE, "w").close()

def log(msg):
    with open(OUT_FILE, "a", encoding="utf-8", errors="replace") as f:
        f.write(msg)

srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
srv.bind(("0.0.0.0", LPORT))
srv.listen(1)
log("[*] Listening on 0.0.0.0:%d\n" % LPORT)

conn, addr = srv.accept()
log("[+] Connection from %s:%d\n" % addr)
conn.settimeout(0.3)

def reader():
    while True:
        try:
            data = conn.recv(4096)
            if not data:
                log("\n[!] Connection closed by remote\n")
                break
            log(data.decode("utf-8", errors="replace"))
        except socket.timeout:
            continue
        except Exception as e:
            log("\n[!] reader error: %s\n" % e)
            break

threading.Thread(target=reader, daemon=True).start()

sent = 0
while True:
    try:
        with open(CMD_FILE, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
        while sent < len(lines):
            line = lines[sent]
            sent += 1
            if line.strip() == "__EXIT_BROKER__":
                log("\n[*] Broker exiting\n")
                conn.close()
                sys.exit(0)
            conn.sendall(line.rstrip("\n").encode() + b"\n")
        time.sleep(0.4)
    except Exception as e:
        log("\n[!] sender error: %s\n" % e)
        time.sleep(0.5)
