
###
 # @Date: 2024-05-27 10:28:07
 # @LastEditTime: 2024-06-07 11:08:27
 # @Description: 
 # @FilePath: /xuchp.github.io/deploy.sh
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