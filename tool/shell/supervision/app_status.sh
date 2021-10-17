#!/bin/bash
# Func: get process status in process.cfg

HOME_DIR="/home/clf";
CONFIG_FILE="process.cfg";
this_pid=$$;

function get_all_group
{


  G_LIST=$( sed -n '/[GROUP_LIST]/,/\[.*\]/p' "$HOME_DIR/$CONFIG_FILE" | egrep -v '(^$|\[.*\])' );
  echo "$G_LIST";
}

function get_all_process
{
  for group in $(get_all_group)
  do
    P_LIST=$(sed -n "/\[$group\]/,/\[.*\]/p" "$HOME_DIR/$CONFIG_FILE"  | egrep -v '(^$|\[.*\])');
    echo $P_LIST;
  done
  
}

function get_process_pid_by_name 
{
  if [ $# -ne 1 ]; then
    exit 1;
  fi

  process_name="$1"

  pids=$( ps -ef | grep "$process_name" | grep -v grep | grep -v "$this_pid" | grep -v $0 | awk '{print $2}' );

  echo "$pids"

}

function get_process_info_by_pid 
{
  pid=$1;
  if [ $(ps -ef | awk -v pid="$pid" '$2==pid{print}' | wc -l ) -eq 1 ];then
    pro_status="RUNNING";
  else
    pro_status="STOPED";
  fi

  pro_cpu=$(ps aux | awk -v pid=$pid '$2==pid{print $3}');
  pro_mem=$(ps aux | awk -v pid=$pid '$2==pid{print $4}');
  pro_start_time=$(ps -p $1 -o lstart | grep -v STARTED);

}

function is_group_in_config 
{
  group_name="$1";
  for gn in $(get_all_group); do
    if [ "$gn" == "$group_name" ]; then
      return;
    fi;
  done;

  echo "Group $group_name is not in process.cfg";
  return 1;
}

function is_prcesss_in_config
{
  process_name="$1"
  for pn in $(get_all_process); do
    if [ "$pn" == "$process_name" ]; then
      return;
    fi
  done;

  echo "process $process_name is not in process.cfg";

  return 1;
}

function get_all_process_in_group 
{
  group_name="$1";
  
  is_group_in_config $group_name;
  if [ $? -eq 1 ]; then
    echo "GroupName $group_name is not in progress.cfg"; 
    exit 1;
  fi;

  p_list=$(sed -n "/\[$group_name\]/,/\[.*\]/p" "$HOME_DIR/$CONFIG_FILE" | grep -E -v "(^$|\[.*\]|^#)");
  echo $p_list;
}

function get_group_by_process_name
{
  process_name=$1;
  for gn in $(get_all_group); do
    for pn in $(get_all_process_by_group $gn); do
        if [ "$pn" == "$process_name" ]; then
          echo "$gn";
          exit;
        fi
    done;
  done;
}


function format_print {
  process_name=$1;
  group_name=$2;

  ps -ef | grep "$process_name" | grep -v grep | grep -v "$this_pid" &> /dev/null;

  if [ $? -eq 0 ]; then
    pids=$(get_process_pid_by_name $process_name); 

    for pid in $pids; do
      get_process_info_by_pid "$pid";
      awk -v p_name="$process_name" \
        -v g_name="$group_name" \
        -v p_status="$pro_status" \
        -v p_pid="$pid" \
        -v p_cpu="$pro_cpu" \
        -v p_mem="$pro_mem" \
        -v p_start_time="$pro_start_time" \
        'BEGIN{printf "%-20s%-10s%-10s%-6s%-7s%-10s%-20s",p_name,g_name,p_status,p_pid,p_cpu,p_mem,p_start_time}'
    done;
  else 
    awk -v p_name="$process_name" -v g_name="$group_name" 'BEGIN{printf "%-20s%-10s%-10s%-6s%-7s%-10s%-20s",p_name,g_name,STOPPED,NULL,NULL,NULL,NULL}'
  fi;
}


if [ ! -e  "$HOME_DIR/$CONFIG_FILE" ]; then
  echo "$CONFIG_FILE is not exit, please check...";
  exit 1;
fi

# echo $(get_all_process);
# get_process_pid_by_name $1;

# get_process_by_pid 26072

# echo "$pro_status $pro_cpu $pro_mem $pro_start_time";

get_all_process_in_group $1
# if [ $? -eq 0 ]; then
#   echo "exit";
# else 
#   echo "not exit";
# fi


# 程序主流程设计
# ./app_status.sh 执行有三种情况：
# 1. 无参数               列出配置文件中所有进程的运行信息
# 2. -g GroupName        列出GroupName组内的所有进程
# 3. process_name2       列出指定进程的运行信息


awk 'BEGIN{printf "%-20s%-10s%-10s%-6s%-7s%-10s%-20s\n",
  "ProcessName---------","GroupName---","Status----","PID---","CPU----","MEMORY----","StartTimes---"}';

if [ $# -gt 0 ]; then
  if [ $1 == "-g" ]; then
    shift;
    for gn in "$@"; do
      is_group_in_config "$gn" || continue;
      for pn in $(get_process_by_group "$gn"); do
        echo "$pn";
        is_process_in_config "$pn" && format_print "$pn" "$gn";
      done;
    done;
    exit;
  fi

  for pn in "$@"; do
    echo "$pn";
    gn=$(get_group_by_process_name "$pn");
    is_process_in_config "$pn" && format_print "$pn" "$gn";
  done; 
  exit;
fi;

for pn in $(get_all_process); do
  gn=$(get_group_by_process_name "$pn");
  is_process_in_config "$pn" && format_print "$pn" "$gn";
done;

