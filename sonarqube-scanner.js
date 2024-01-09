// import scanner from "sonarqube-scanner";
const scanner=require('sonarqube-scanner');

const userToken = "squ_021f90e4687a634e0e7520b5986be0c04c690a25";
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: userToken,
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/test/**",
    },
  },
  () => process.exit()
);
