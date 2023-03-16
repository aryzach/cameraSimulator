# Define the sensor image size in pixels
pxw , pxh = 640, 640
w = pxw / pxh

# Define the sensor size in mm
# width, height in JS
sensor_size_w_mm , sensor_size_h_mm = 19.2 , 19.2 

# Define the lens focal length in mm
focal_length_mm = 200

# Define the width of the real object in meters
object_width_m = .1

# Define the distance to the object in meters
distance_m = 100

# Calculate the sensor size in pixels
sensor_size_pixels = (sensor_image_size[0] * sensor_size_mm) / focal_length_mm

# Calculate the size of the object in pixels
object_size_pixels = (object_width_mm / distance_mm) * sensor_size_pixels

print("Sensor size in pixels:", sensor_size_pixels)
print("Object size in pixels:", object_size_pixels)
