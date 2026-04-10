package com.tollwise.util;
public class GeoUtil {
    private static final double R = 6371.0;
    public static double haversine(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2-lat1), dLon = Math.toRadians(lon2-lon1);
        double a = Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(Math.toRadians(lat1))*Math.cos(Math.toRadians(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
        return R*2*Math.asin(Math.sqrt(a));
    }
    public static double[] projectPointOnSegment(double px, double py, double ax, double ay, double bx, double by) {
        double dx=bx-ax, dy=by-ay;
        if (dx==0 && dy==0) return new double[]{ax,ay,0.0};
        double t = Math.max(0.0,Math.min(1.0,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)));
        return new double[]{ax+t*dx,ay+t*dy,t};
    }
    public static double getBearing(double lat1, double lon1, double lat2, double lon2) {
        double dLon=Math.toRadians(lon2-lon1);
        double x=Math.sin(dLon)*Math.cos(Math.toRadians(lat2));
        double y=Math.cos(Math.toRadians(lat1))*Math.sin(Math.toRadians(lat2))-Math.sin(Math.toRadians(lat1))*Math.cos(Math.toRadians(lat2))*Math.cos(dLon);
        return (Math.toDegrees(Math.atan2(x,y))+360)%360;
    }
}