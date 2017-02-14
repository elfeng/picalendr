def ssh(remoteCommand){
    return sh(returnStdout: true, script: "ssh $SSH_TARGET $remoteCommand")
}

pipeline {

    agent any

    stages {
       
       stage('Edit files') {
            steps {
                sh "sed -ie s/FLICKR_KEY/$FLICKR_KEY/ src/FlickrURLs.js"
                sh "sed -ie s/GA_KEY/$GA_KEY/ public/index.html"
            }
       }
       
       stage('Build image'){
            steps {
                sh "docker build -t picalendr ."
            }
       }       
       
       stage('Stop old container') {
            steps {
                script {
                    def containerId = ssh("sudo docker ps -a -q --filter name=$APP_NAME --format=\"{{.ID}}\" ")
                    echo "Container Id to stop : $containerId"
                    if (containerId){
        	                echo "Stopping old container $containerId ..."
        	                ssh("sudo docker stop $containerId")
                            echo "Deleting old container ${containerId} ..."
        	                ssh("sudo docker rm $containerId")
                            echo "Deleting old image $APP_NAME ..."
        	                ssh("sudo docker rmi $APP_NAME")
                    } 
                }
            }
       }
       
       stage('Ship image') {
           steps {
                script {
                    sh "docker save picalendr -o $DOCKER_ARCHIVE_NAME"
                    sh "scp $DOCKER_ARCHIVE_NAME $SSH_TARGET:$REMOTE_DOCKER_ARCHIVE_PATH"
                }
           }
       }
       
       stage('Run new container') {
           steps {
                script {
                    ssh("sudo docker load -i $REMOTE_DOCKER_ARCHIVE_PATH/$DOCKER_ARCHIVE_NAME")
                    ssh("sudo docker run -d -p 3001:3001 --name $APP_NAME -t $APP_NAME")
                }
           }
       }       
       
       stage('Clean') {
           steps {
                script {
                    sh "rm $DOCKER_ARCHIVE_NAME"
                    ssh("rm $REMOTE_DOCKER_ARCHIVE_PATH/$DOCKER_ARCHIVE_NAME")
                }
           }
       }          
    }   
}    
