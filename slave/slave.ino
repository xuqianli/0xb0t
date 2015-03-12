

//Sonar 1 ---------- left
int echoPin1 =9;
int initPin1 =10;
int distance1 =0;

//Sonar 2 ----------- middle
int echoPin2 =4;
int initPin2 =5;
int distance2 =0;

//Sonar 3 ----------- right
int echoPin3 =2;
int initPin3 =3;
int distance3 =0;

//Speed Constants
const int speedA = 200;
const int speedB = 200;

//Command Transfer Constants
const int MAX_COMMAND_LENGTH = 255;
int incomingByte;
const char BG = 'B';
const char ED = 'E';

//Distances message
String message1 = "";
String message2 = "";
String message3 = "";

void setup() {
  //--------Setup Channel A--------//

  //Initiates Motor Channel A pins
  pinMode (13, OUTPUT);
  pinMode (12, OUTPUT);
  pinMode (11, OUTPUT);


  //--------Setup Channel B--------//

  //Initiates Motor Channel B pin
  pinMode (8, OUTPUT);
  pinMode (7, OUTPUT);
  pinMode (6, OUTPUT);

  
  
  pinMode(initPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(initPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(initPin3, OUTPUT);
  pinMode(echoPin3, INPUT);

  Serial.begin(9600);
  
}

void loop() {
  delay (10);
  //taking distances from sonars less than 1 meter
  if (getDistance(initPin1, echoPin1) < 100){
    distance1 = getDistance(initPin1, echoPin1);
    send ("#1:"+ String(distance1));    
  } else {
   send ("#1:over"); 
  }
  
  delay (50);
  
  if (getDistance(initPin2, echoPin2) < 100){
    distance2 = getDistance(initPin2, echoPin2);\
    send ("#2:" + String(distance2));    
  } else {
   send ("#2:over"); 
  }
  
  delay (50);
  
  if (getDistance(initPin3, echoPin3) < 100){
    distance3 = getDistance(initPin3, echoPin3);
    send ("#3:" + String(distance3));
  } else {
   send ("#3:over"); 
  }
  
  delay (50);
 

  if (Serial.available()) {  
    
  delay (10);
    
    // read incomming 
    incomingByte = Serial.read();
    switch (incomingByte) {
      case 117:
        //send ("up");
        forward ();
        break;
      case 100:
        //send ("down");
        backward ();
        break;
      case 108:
        //send ("left");
        turnLeft ();
        break;
      case 114:
        //send ("right");
        turnRight ();
        break;
      case 115:
        //send ("s");
        brake ();
        break; 
      default:
        brake ();
        break;
    }
  }


}


// gets the distance of the sonar
int getDistance (int initPin, int echoPin){

 digitalWrite(initPin, HIGH);
 delayMicroseconds(2); 
 digitalWrite(initPin, LOW); 
 
 unsigned long pulseTime = pulseIn(echoPin, HIGH); 
 int distance = pulseTime/58;
 return distance;
 
}

// Sends data to the raspberry pi as string
void send (String messageSend) {
  Serial.print   ("B" + messageSend + "E");
}
 
 
 
void  forward () {
   
  analogWrite (11, speedA);   
  analogWrite (6, speedB); 
  // channel B  
  digitalWrite (8, LOW);
  digitalWrite (7, HIGH); 
  
   // channel A
  digitalWrite (13, LOW);
  digitalWrite (12, HIGH);
}

void backward () {
  
  analogWrite (11, speedA);   
  analogWrite (6, speedB); 
  // channel B   
  digitalWrite (8, HIGH);
  digitalWrite (7, LOW); 
  
   // channel A
  digitalWrite (13, HIGH);
  digitalWrite (12, LOW);
}

void turnLeft () {
  analogWrite (6, 150);
  analogWrite (11, 0);
  digitalWrite (8, LOW);
  digitalWrite (7, HIGH);

}

void turnRight () {
  analogWrite (11, 150);
  analogWrite (6, 0);
  digitalWrite (13, LOW);
  digitalWrite (12, HIGH);
}

void pause (int time){
  analogWrite (11, 0);
  analogWrite (6, 0);
  delay (time);
  analogWrite (11, speedA);
  analogWrite (6, speedB);    
}

void brake () {
  analogWrite (11, 0);
  analogWrite (6, 0);
}
