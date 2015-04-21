#include <stdio.h>
#include <stdlib.h>
#include <gps.h>
char buf[100];
char * getGPSResult() {
    double latitude=0;
    double longitude=0;
    gps_init();
    loc_t data;
    gps_location(&data);
    latitude = data.latitude;
    longitude = data.longitude;
    sprintf( buf, "%lf,%lf", latitude, longitude );
    return buf;
}

int main(void) {
    printf("%s", getGPSResult());
    return EXIT_SUCCESS;
}

