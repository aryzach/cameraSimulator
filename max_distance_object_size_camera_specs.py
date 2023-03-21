

def max_dist(object_size_m, focal_length_mm, sensor_height_pixels, sensor_height_mm, object_height_pixels):
    return (object_size_m * focal_length_mm * sensor_height_pixels) / (sensor_height_mm * object_height_pixels)

def max_dist_2_pixels_10cm_object(focal_length_mm, sensor_height_pixels, sensor_height_mm):
    return max_dist(.1, focal_length_mm, sensor_height_pixels, sensor_height_mm, 2)



chronos = max_dist_2_pixels_10cm_object(35,1080,10.8)
freefly_wave = max_dist_2_pixels_10cm_object(70,2048,23)
freefly_wave_small_object = max_dist(.05, 70, 2048, 23, 2)
print('chronos: ', chronos)
print('freefly_wave: ', freefly_wave)
print('freefly_wave_small_object: ', freefly_wave_small_object)

