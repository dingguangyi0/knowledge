#!/bin/bash  

echo "执行编译"
npm run build

# 远程服务器的连接信息  
remote_server="82.156.143.11"
remote_user="root"
remote_directory="/root/knowledge/"

echo "开始执行发布程序"

echo "执行删除远程脚本-start"
ssh $remote_user@$remote_server "rm -r $remote_directory/build"
echo "执行删除远程脚本-end"

# 本地文件的路径和名称
local_file="/Users/dingguangyi/work/app/knowledge/build/"

# 远程脚本的路径和名称
remote_script="/root/knowledge/script.sh"

echo "复制本地数据到远程-start"
# 上传本地文件到远程服务器
scp -r "$local_file" "$remote_user@$remote_server:$remote_directory"
echo "复制本地数据到远程-end"

# 连接到远程服务器并执行脚本
echo "启动nginx-start"
ssh $remote_user@$remote_server "sh" $remote_script
echo "启动nginx-end"
