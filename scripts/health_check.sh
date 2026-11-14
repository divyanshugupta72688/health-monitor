#!/bin/bash
LOG="$HOME/health.log"

if curl -sf http://localhost:3000/health > /dev/null; then
  echo "$(date) UP" >> "$LOG"
else
  echo "$(date) DOWN - restarting container" >> "$LOG"
  docker restart hm
fi

echo "$(date) Disk: $(df -h / | awk 'NR==2{print $5}') Mem: $(free -m | awk 'NR==2{print $3"MB"}')" >> "$LOG"