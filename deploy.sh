eval `ssh-agent -s`
mkdir -p ~/.ssh
ls ~/.ssh
openssl aes-256-cbc -K $encrypted_10485440d0a6_key -iv $encrypted_10485440d0a6_iv -in github_deploy_key.enc -out ~/.ssh/id_rsa -d
mv github_deploy_key.pub ~/.ssh/id_rsa.pub
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub
ssh-add ~/.ssh/id_rsa
ssh-keyscan -H 54.70.220.103 >> ~/.ssh/known_hosts
cap production deploy