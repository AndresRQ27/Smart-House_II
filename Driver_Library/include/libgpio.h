#include <sys/mman.h> //mmap
#include <err.h> //error handling
#include <fcntl.h> //file ops
#include <unistd.h> //usleep
#include <stdio.h>
//Static base
static unsigned GPIO_BASE = 0x3f200000;
//Regs pointers
volatile unsigned int * gpfsel0; //gpios from 2 to 9  
volatile unsigned int * gpset0; //gpios from 0 to 31
volatile unsigned int * gpclr0; //gpios from 0 to 31
volatile unsigned int * gplev0; //gpios from 0 to 31

const char * MODE_NAMES[]={"INPUT", "OUTPUT", "F5", "F4", "F0", "F1", "F2", "F3"};

/*Function prototypes*/
void gpioInitPtrs();
void gpioSetMode();
void gpioWrite(unsigned char bit);

  
void gpio_set_mode(char num_gpio, char mode);
void gpio_get_mode(char num_gpio);
void gpio_write(char num_gpio, char value);
int gpio_read(char num_gpio);

void gpio_set_mode_all(char mode);
void gpio_write_all(char value);
