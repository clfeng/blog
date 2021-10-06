#!/bin/bash

function get_users 
{
  users=$(cat /etc/passwd | cut -d: -f1 | tail -n4);
  echo "---------------------";
  echo "$users";
}

get_users;
user_lists=$(get_users);
echo "----------split-----------";
for u in $user_lists
do
  echo $u
done

