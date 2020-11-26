#!/bin/sh

# creates a gentoo prefix https://wiki.gentoo.org/wiki/Project:Prefix

wget https://gitweb.gentoo.org/repo/proj/prefix.git/plain/scripts/bootstrap-prefix.sh
chmod +x bootstrap-prefix.sh

# this will take a while
./bootstrap-prefix.sh ~/gentoo noninteractive &
wait

cd ~/gentoo
chmod +x startprefix
./startprefix

# portage can now be used
