#include <libgpio.h>
#include <time.h>
#include <stdlib.h>

int GPIO_TRIGGER = 3;
int GPIO_ECHO = 4;

double distance(){
  //set trigger to high
  gpio_write(GPIO_TRIGGER, 0);

  //wait to false
  while(gpio_read(GPIO_TRIGGER) != 0);

  gpio_write(GPIO_TRIGGER, 1);
  //set trigger after 0.01ms to low
  usleep(10);
  gpio_write(GPIO_TRIGGER, 0);

  clock_t start_time, stop_time;

  //save start_time
  while(gpio_read(GPIO_ECHO) == 0)
    start_time = clock();
  
  //save time of arrival
  while(gpio_read(GPIO_ECHO) == 1)
    stop_time = clock();
  
  double time_elapsed = ((double) (stop_time - start_time)) / CLOCKS_PER_SEC;

  double distance = (time_elapsed * 34300.0) / 2.0;

  return distance;
}
int main(int argc, char const *argv[]){

  gpioInitPtrs();

  //set GPIO direction(IN/OUT)
  gpio_set_mode(GPIO_TRIGGER, 1);
  gpio_set_mode(GPIO_ECHO, 0);
  double dist = distance();

  char buffer[256];

  sprintf(buffer, "echo 'Distance: %f\n' >> log.txt", dist);
  
  system(buffer);
  if(dist < 200.0)
    return 1;
  else
    return 0;
  
  // while(1){
  //   dist = distance();
  //   printf("Measured Distance = %f cm\n", dist);
  //   usleep(1000000);
  // }

  // gpio_set_mode(7, 1);//gpio7 to output
  // gpio_get_mode(7);

  // gpio_write(7, 1);
  // gpio_read(7);
  // usleep(1000000);
  // gpio_write(7, 0);
  // gpio_read(7);
  // usleep(1000000);
  // gpio_write(7, 1);
  // gpio_read(7);
  // usleep(1000000);
  // gpio_write(7, 0);
  // gpio_read(7);
}