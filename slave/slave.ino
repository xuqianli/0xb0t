

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

//defining constants
const int speedA = 200;
const int speedB = 200;
const int MAX_COMMAND_LENGTH = 255;

int _direction = 0; // 0 is forward
//
char* replyOK = {"OK\n"};
char resetByte = '!';
char stopByte = '#';
char* upKey = {"up"};
char* downKey = {"down"};
char* leftKey = {"left"};
char* rightKey = {"right"};
char* stopKey = {"stop"};

int incomingByte = 0;
int charCount = 0;
char command[MAX_COMMAND_LENGTH + 1]; // leave space for \0
bool locked = false;


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
/*
  delay (10);
  //taking distances from sonars
  distance1 = getDistance(initPin1, echoPin1);
  delay (50);
  distance2 = getDistance(initPin2, echoPin2);
  delay (50);
  distance3 = getDistance(initPin3, echoPin3);
  delay (50);
   //initializing speed
  analogWrite (11, speedA);
 // digitalWrite (13, LOW);
  analogWrite (6, speedB);
  
  Serial.print ("#1: ");
  Serial.println (distance1);
  Serial.print ("#2: ");
  Serial.println (distance2);
  Serial.print ("#3: ");
  Serial.println (distance3);
  */
  
  if (Serial.available()) {
    incomingByte = Serial.read();
    
    if (incomingByte > 0){
      Serial.println (incomingByte);
    }
   // delay (1000);
    incomingByte = 0;
    /*if ((char)incomingByte == resetByte) {
      locked = false;
      charCount = 0;
      return;
    }

    if (locked) {
      Serial.println("@");
      return;
    }

    if ((char)incomingByte != stopByte) {
      if (charCount > MAX_COMMAND_LENGTH - 1) {
        Serial.println("@");
        locked = true;
        return;
      }
      else {
        command[charCount] = (char)incomingByte;
        charCount++;
      }
    }
    else {
      command[charCount] = '\0';
      charCount = 0;
      if (strcmp(stopKey, command) == 0) {
        brake ();
        Serial.println ("break");
      }
  
    }*/
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
 
 
 
void  forward (int time) {
   
  analogWrite (11, speedA);   
  analogWrite (6, speedB); 
  // channel B  
  digitalWrite (8, LOW);
  digitalWrite (7, HIGH); 
  
   // channel A
  digitalWrite (13, LOW);
  digitalWrite (12, HIGH);
  delay (time);
}

void backward (int time) {
  
  analogWrite (11, speedA);   
  analogWrite (6, speedB); 
  // channel B   
  digitalWrite (8, HIGH);
  digitalWrite (7, LOW); 
  
   // channel A
  digitalWrite (13, HIGH);
  digitalWrite (12, LOW);
  delay (time);
}

void left (int time) {
  analogWrite (6, 150);
  analogWrite (11, 0);
  digitalWrite (8, LOW);
  digitalWrite (7, HIGH);
  delay (time);
  analogWrite (11, speedA);
  analogWrite (6, speedB);
}

void right (int time) {
  analogWrite (11, 150);
  analogWrite (6, 0);
  digitalWrite (13, LOW);
  digitalWrite (12, HIGH);
  delay (time);
  analogWrite (11, speedA);
  analogWrite (6, speedB);
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
