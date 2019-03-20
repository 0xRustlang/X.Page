node {
    def app
    checkout scm

    stage('Build image') {
        app = docker.build("firexproxy/x.page:${env.BUILD_ID}")
    }

    stage('Push image') {
        docker.withRegistry("https://docker.firexproxy.com", "deploy") {
            app.push()
        }
    }

    stage('Deploy image') {
        withCredentials([usernamePassword(credentialsId: 'deploy', passwordVariable: 'C_PASSWORD', usernameVariable: 'C_USER')]) {
            sh "ssh -o StrictHostKeyChecking=no -t arcsin@firexproxy.com -p2244 'docker stop xpage || true'"
        }
    }
}
