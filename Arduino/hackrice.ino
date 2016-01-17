#include <Servo.h>

Servo servo1;
const int RED_PIN = 9;
const int GREEN_PIN = 10;
const int BLUE_PIN =11;
const int buzzerPin=12;
const int songlength1=4;
const int songlength=8;
char notes1[]="cccc";
char notes[]="fe fe fe";
int beats1[]={
  1,1,1,1};
int beats[]={
  1,1,1,1,1,1,1,1};
int tempo=150;

void setup()
{
  Serial.begin(9600);
  servo1.attach(8);
  pinMode(RED_PIN,OUTPUT);
  pinMode(GREEN_PIN,OUTPUT);
  pinMode(BLUE_PIN,OUTPUT);
  pinMode(buzzerPin,OUTPUT);
}

void loop()
{
  int command;
  while(true)
  {
    while (Serial.available() > 0)
    {
      //command=Serial.read() - '0';
      command=Serial.parseInt();
      blink(command);

      //blink(Serial.read() - '0');  // convert the character '1'-'9' to decimal 1-9
    }
  }
}

void blink(int message)
{
  int index1;
  int index2;
  int i1, i, duration1, duration;
  int lockstatus;
  int lockornot;
  if (message==1)
  {
    lockornot=1;
    for(i1=0;i1<songlength1;i1++)
    {
      duration1=beats1[i1] * tempo;

      if (notes[i1]==' ')
      {
        delay(duration1);
      }
      else 
      {
        tone(buzzerPin,frequency(notes1[i1]),duration1);
        delay(duration1);
      }
      delay(tempo/10);
    }

    servo1.write(90);
    for (index1=0;index1<3;index1++)
    {
      digitalWrite(RED_PIN,LOW);
      digitalWrite(GREEN_PIN,HIGH);
      digitalWrite(BLUE_PIN,LOW);
      delay(100);
      digitalWrite(RED_PIN,LOW);
      digitalWrite(GREEN_PIN,LOW);
      digitalWrite(BLUE_PIN,LOW);
      delay(100);
    }
    delay(1000);
  }
  else
  {
    if (message==2)
    {
      servo1.write(180);
      for (index2=0;index2<3;index2++)
      {
        digitalWrite(RED_PIN,HIGH);
        digitalWrite(GREEN_PIN,LOW);
        digitalWrite(BLUE_PIN,LOW);
        delay(100);
        digitalWrite(RED_PIN,LOW);
        digitalWrite(GREEN_PIN,LOW);
        digitalWrite(BLUE_PIN,LOW);
        delay(100);
      }
      delay(1000);
      lockornot=0;
    }
    else 
    {
      if (message==3)
      {
        servo1.write(90);
        lockornot=1;
        for(i=0;i<songlength;i++)
        {
          duration=beats[i] * tempo;

          if (notes[i]==' ')
          {
            delay(duration);
          }
          else 
          {
            tone(buzzerPin,frequency(notes[i]),duration);
            delay(duration);
          }
          delay(tempo/10);
        }
      }
      else 
      {

        if (message==4)
        {
          //lockstatus=servo1.read();
          Serial.println(lockornot);
        }
      }
    }
  }
}

int frequency(char note)
{
  int i;
  const int numNotes=8;
  char names[]={
    'c','d','e','f','g','a','b','C'        };
  int frequencies[]={
    262, 294, 330, 349, 392, 440, 494, 523        };
  for (i=0;i < numNotes; i++)
  {
    if(names[i] == note)
    {
      return(frequencies[i]);
    }
  }
  return (0);


}