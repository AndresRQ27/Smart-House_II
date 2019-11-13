#include <libgpio.h>

//Initialize pointers: performs memory mapping, exits if mapping fails
void gpioInitPtrs(){
  int fd = -1;
  //Loading /dev/mem into a file
  if ((fd = open("/dev/mem", O_RDWR, 0)) == -1)
    err(1, "Error opening /dev/mem");
  //Mapping GPIO base physical address
  gpfsel0 = (unsigned int*) mmap(0, getpagesize(),PROT_WRITE, MAP_SHARED, fd, GPIO_BASE);
  //Check for mapping errors
  if (gpfsel0 == MAP_FAILED)
    errx(1, "Error during mapping GPIO");
  //Set regs pointers
  gpset0 = gpfsel0 + 0x7; // offset 0x1C / 4 = 0x7
  gpclr0 = gpfsel0 + 0xA; // offset 0x28 / 4 = 0xA
  gplev0 = gpfsel0 + 0xD; // offset 0x34 / 4 = 0xD
}


void gpio_write(char num_gpio, char value){
  if(num_gpio >=2 && num_gpio <= 9){
    unsigned  val = 1 << num_gpio; //shift bit to gpio of interest
    if(value == 1)
      *gpset0 = *gpset0 | val;
    else
      *gpclr0 = *gpclr0 | val;
  }
  else{
    printf("Invalid gpio number. Valid numbers: [2-9]\n");
  }
}

void gpio_write_all(char value){
  if(value == 1)
    *gpset0 = 0xFFFFFFF;
  else
    *gpclr0 = 0xFFFFFFF;
}

int gpio_read(char num_gpio){
  if(num_gpio >=2 && num_gpio <= 9){
    unsigned val = (*gplev0 >> num_gpio) & 0x1; //shift bits to gpio of interest and obtain only 1 bits
    //printf("The value of GPIO%d is: %x\n", num_gpio, val);
    return (int) val;
  }
  else{
    printf("Invalid gpio number. Valid numbers: [2-9]\n");
    return -1;
  }  
}


void gpio_set_mode(char num_gpio, char mode){
  if(num_gpio >=2 && num_gpio <= 9){
    if(mode >= 0 && mode <= 7){
      unsigned val = mode << 3*num_gpio;//shift mode bits to gpio of interest
      *gpfsel0 = *gpfsel0 | val;
    }
    else{
      printf("Invalid mode. Valid modes: [0-7]. 0 = Input, 1 = Output\n");
    }
  }
  else{
    printf("Invalid gpio number. Valid numbers: [2-9]\n");
  }
}

void gpio_set_mode_all(char mode){
  unsigned val = 0x0;
  for(int i = 2; i < 10; i++){
    val = (mode << 3*i) | val;
  }
  *gpfsel0 = val;
}

void gpio_get_mode(char num_gpio){
  if(num_gpio >=2 && num_gpio <= 9){
    unsigned val = (*gpfsel0 >> 3*num_gpio) & 0x7;//shift bits to gpio of interest and obtain only 3 bits
    printf("The mode of GPIO%d is: %s\n", num_gpio, MODE_NAMES[val]);
  }
  else{
    printf("Invalid gpio number. Valid numbers: [2-9]\n");
  }  
}

