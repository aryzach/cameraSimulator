from decimal import *
import math
import numpy as np
import pprint

_GRAVITATIONAL_CONSTANT = Decimal('6.67384E-11')
_MASS_EARTH = Decimal('5.9722E24')  # kg
_RADIUS_EARTH = Decimal('6.378E6')


def radians(degrees):
    return (degrees * math.pi) / 180

# m/s
def orbital_velocity(mass, altitude):
    '''Calculates the delta-V orbital velocity.

    Returns delta-V in meters per second for the orbital
    velocity for a given object given its mass in kilograms
    and its radius in meters.'''

    radius = altitude + _RADIUS_EARTH 

    if mass == Decimal('0') or radius == Decimal('0'):
        # User gave a mass or radius which is unrealistic,
        # abort.
        return None
    

    result = Decimal((_GRAVITATIONAL_CONSTANT * mass) / radius)
    result = result.sqrt()

    return result

def velocity_component_along_path(true_velocity, inclination):
    return Decimal(math.cos(radians(inclination))) * true_velocity

# km -> km -> degree -> km/h
def relative_velocity(h1,h2,inclination):
    v1 = orbital_velocity(_MASS_EARTH, h1 * 1000)
    true_velocity = orbital_velocity(_MASS_EARTH, h2 * 1000)
    v2 = velocity_component_along_path(true_velocity, inclination)
    return m_per_s_to_km_per_hr(abs(v1-v2))

def relative_velocity_same_path(h1,h2):
    return relative_velocity(h1,h2,0)

def m_per_s_to_km_per_hr(mps):
    return mps * Decimal('3.6')

def object_path_length(fov, distance):
    rad = radians(fov)
    return Decimal(2 * distance * Decimal(math.tan(rad / 2)))

# given two altitudes and a FOV angle, how long does it take the object to traverse the FOV?
# km -> km -> degrees -> hours
def time_to_traverse_FOV(h1,h2,fov,inclination):
    diff = abs(h1 - h2)
    return object_path_length(fov, diff) / relative_velocity(h1,h2,inclination)

altitudes_sensor = [500]
arange = np.arange(.01,2,.01)
altitudes_debris = list(map(lambda x: Decimal(x+500),arange.tolist()))
fovs = [14]
#inclinations = [0,45,90,135,180]
inclinations = [180]
fpss = [120, 240, 500, 800, 1000]

diffDist_fov_fps_dict = {}

t_sec_dict = {}

for s in altitudes_sensor:
    for d in altitudes_debris:
        for f in fovs:
            for i in inclinations:
                if s != d:
                    diff = round(abs(s-d),4)
                    t_hours = time_to_traverse_FOV(s,d,f,i)
                    t_sec = round(3600 * t_hours, 4)
                    for fps in fpss:
                        num_frames = t_sec * fps
                        try:
                            current = diffDist_fov_fps_dict[(diff,f)]
                            if (num_frames > 2 and fps < current) or diffDist_fov_fps_dict.get(diff,f) == None:
                                diffDist_fov_fps_dict[(diff,f)] = fps
                                t_sec_dict[(diff, f, i)] = t_sec
                        except:
                            if (num_frames > 2):
                                diffDist_fov_fps_dict[(diff,f)] = fps
                                t_sec_dict[(diff, f, i)] = t_sec


pp = pprint.PrettyPrinter(indent=4)
pp.pprint(diffDist_fov_fps_dict)
pp.pprint(t_sec_dict)

#print(time_to_traverse_FOV(500,501,45,180))
#print(time_to_traverse_FOV(500,1000,45,0))
#print(time_to_traverse_FOV(500,1500,45,0))
