###
 # @Date: 2024-05-27 10:28:07
 # @LastEditTime: 2024-06-07 11:11:54
 # @Description: 
 # @FilePath: /xuchp.github.io/deploy.sh
### 
# 忽略错误
set -e

git pull 
echo 'please input commitMsg：'
read commitMsg

# 构建
yarn run docs:build # 然后执行打包命令

git add .

git commit -m "$commitMsg"

git push origin master