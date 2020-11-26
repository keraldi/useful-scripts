#!/bin/bash
# Shell script to create a (reverse) tunnel to a remote
# If executed while the tunnel is already active, the script is aborted
# This can be used to ensure high uptime if used within a crontab
#
# Keep in mind that privileged ports (<1024) require root
# Usage:
#  $ ./tunnel.sh localport remoteport
#  # ./tunnel.sh localport remoteport [root]    # execution as root user allows privileged localport, connection to root user allows privileged remoteport
#
# * localport: connection attaches to this local port
# * remoteport: connection attaches to this remote port

# I suggest using this script in a crontab `crontab -e` to ensure uptime on the tunnel
# This file was tailored to my needs.
# Feel free to submit a PR to serve a more general purpose

tunnel_chk() {

  # Your Individual SSH Connection Info.
	# PEM_LOC is optional parameter for SSH login.
    if [ -z "$5" ]; then
	    PEM_LOC="/path/to/your/.ssh/id_rsa"
	    ID="user_without_shell_on_remote"
    else
	    if [ "$5" = "root" ]; then
		    PEM_LOC="/path/to/your/.ssh/root_id_rsa"
		    ID="root"
	    else
		    exit 1
	    fi
    fi
    ADDR="REMOTE.IP.OR.DOMAIN"  # enter remote Host as IP or Domain
    PORT="22"                   # enter remote ssh port

    PEMSTR=""
    if [ -n "$PEM_LOC" ]; then
        PEMSTR="-i $PEM_LOC"
    fi

    if [ "$1" = "L" ]; then
        foo="$(echo > /dev/tcp/localhost/"$2")"
        if [ $? != 0 ]; then # port is close
            bar="$(pkill -f "$2":"$3":"$4")"
            ssh -fN "$PEMSTR" -L "$2":"$3":"$4" $ID@$ADDR -p $PORT
        fi
    else
        foo="$(echo > /dev/tcp/$ADDR/"$2")"
        if [ $? != 0 ]; then # port is close
            bar="$(pkill -f "$2":"$3":"$4")"
            ssh -fN "$PEMSTR" -R "$2":"$3":"$4" $ID@$ADDR -p $PORT
        fi
    fi
}

# Usage
# tunnel_chk L/R port:host:port timeout_interval
# You can add multiple lines of this functions: SSH tunneling connections.
tunnel_chk R "$1" localhost "$2" "$3"
