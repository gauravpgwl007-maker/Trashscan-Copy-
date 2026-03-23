pipeline {
agent any

```
tools {
    nodejs 'NodeJS'
}

triggers {
    cron('0 4 * * *') // Daily run
}

environment {
    ANDROID_HOME = "C:\\Users\\gwl\\AppData\\Local\\Android\\Sdk"
    PATH = "${ANDROID_HOME}\\platform-tools;${ANDROID_HOME}\\emulator;${env.PATH}"
    AVD_NAME = "Pixel_9_Pro_XL_API_36.1"
}

stages {

    stage('Checkout Code') {
        steps {
            git 'https://https://github.com/gauravpgwl007-maker/Trashscan_Automation.git'
        }
    }

    stage('Install Dependencies') {
        steps {
            bat 'npm install'
        }
    }

    stage('Start Emulator') {
        steps {
            bat """
            start "" "%ANDROID_HOME%\\emulator\\emulator.exe" -avd %AVD_NAME% -no-snapshot -no-audio -no-boot-anim
            """
        }
    }

    stage('Wait for Emulator Boot') {
        steps {
            bat """
            adb wait-for-device
            adb shell getprop sys.boot_completed
            timeout /t 30
            """
        }
    }

    stage('Start Appium') {
        steps {
            bat 'start cmd /k appium -p 4723'
            bat 'timeout /t 10'
        }
    }

    stage('Run Tests') {
        steps {
            bat 'npx wdio run wdio.conf.js'
        }
    }

    stage('Generate Allure Report') {
        steps {
            bat 'allure generate allure-results --clean -o allure-report'
        }
    }
}

post {
    always {
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }

    cleanup {
        bat """
        adb -s emulator-5554 emu kill
        """
    }
}
```

}
