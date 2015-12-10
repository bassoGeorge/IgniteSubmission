#!/bin/bash
PORT=`ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'`
live-server --host="$PORT" --ignore="sass, jade, coffee" --wait=1000
