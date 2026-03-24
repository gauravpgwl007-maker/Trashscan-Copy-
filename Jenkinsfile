pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        ANDROID_HOME = "C:\\Users\\gwl\\AppData\\Local\\Android\\Sdk"
        PATH = "${ANDROID_HOME}\\platform-tools;${ANDROID_HOME}\\emulator;${env.PATH}"
        AVD_NAME = "Pixel_7"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/gauravpgwl007-maker/Trashscan_Automation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                echo Cleaning npm cache...
                npm cache clean --force

                echo Removing node_modules...
                rmdir /s /q node_modules

                echo Deleting package-lock.json...
                del package-lock.json

                echo Installing dependencies...
                npm install --legacy-peer-deps
                '''
            }
        }

        stage('Start Emulator') {
            steps {
                bat '''
                echo Starting emulator...
                start "" "%ANDROID_HOME%\\emulator\\emulator.exe" -avd %AVD_NAME% -no-snapshot -no-audio -no-boot-anim

                echo Waiting a bit after emulator start...
                ping 127.0.0.1 -n 10 > nul
                '''
            }
        }

        stage('Wait for Emulator Boot') {
            steps {
                bat '''
                adb wait-for-device

                :loop
                adb shell getprop sys.boot_completed | find "1"
                if errorlevel 1 (
                    echo Waiting for emulator to boot...
                    ping 127.0.0.1 -n 5 > nul
                    goto loop
                )

                echo Emulator boot completed!
                '''
            }
        }

        stage('Start Appium') {
            steps {
                bat '''
                echo Starting Appium server...
                start "" cmd /c appium -p 4723

                echo Waiting for Appium to be ready...
                ping 127.0.0.1 -n 10 > nul
                '''
            }
        }

        stage('Run Tests') {
            steps {
                bat '''
                echo Running automation tests...
                npx wdio run wdio.conf.js
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat '''
                echo Generating Allure report...
                allure generate allure-results --clean -o allure-report
                '''
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }

        cleanup {
    bat '''
    echo Cleaning up emulator...

    adb devices

    for /f "tokens=1" %%i in ('adb devices ^| find "emulator"') do (
        echo Killing %%i
        adb -s %%i emu kill
    )

    exit 0
    '''
}
    }
}