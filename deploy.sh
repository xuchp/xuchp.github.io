#!usr/bin/env sh
###
 # @Date: 2023-12-22 20:22:07
 # @LastEditTime: 2024-01-16 19:15:36
 # @Description: 
 # @FilePath: \undefinedc:\code\xuchp\deploy.sh
### 

# 忽略错误
set -e

echo 'please input commitMsg：'
read commitMsg

# 构建
yarn run docs:build # 然后执行打包命令

# 进入待发布命令
cd docs/.vitepress/dist # 进到dist目录

git init 
git add -A 
git commit -m "$commitMsg"


git push -f  https://gitee.com/xuchp/xuchp.git master:gh-pages

cd - 

rm -rf docs/.vitepress/dist # 删除dist目录


git add .

git commit -m "$commitMsg"

git push origin master