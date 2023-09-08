package org.apache.cordova.ping;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.Timer;
import java.util.TimerTask;

public class CounterService extends Service {

    Timer timer;
    RequestQueue queue;
    ToneGenerator toneGenerator;

    private boolean running = false;
    private int count = 0;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        timer = new Timer();
        queue = Volley.newRequestQueue(this);
        toneGenerator = new ToneGenerator(AudioManager.STREAM_MUSIC, 100);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!running) {
            running = true;
            createNotificationChannel();
            startForeground(1, buildNotification(count));

            timer.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {
                    updateNotification(++count);
                    toneGenerator.startTone(ToneGenerator.TONE_CDMA_PIP, 150);
                    request(intent.getExtras().getString("url"));
                }
            }, 0, 1000);
        }

        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        timer.cancel();
        timer = null;
        toneGenerator.release();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    "General", "General", NotificationManager.IMPORTANCE_DEFAULT);
            channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private Notification buildNotification(int count) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "General");
        builder.setSmallIcon(getResources().getIdentifier("ic_launcher", "mipmap", getPackageName()));
        builder.setContentTitle("Counter is running!");
        builder.setContentText(Integer.toString(count));
        builder.setOngoing(true);
        builder.setPriority(NotificationCompat.PRIORITY_DEFAULT);
        return builder.build();
    }

    private void updateNotification(int count) {
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        if (notificationManager.areNotificationsEnabled()) {
            notificationManager.notify(1, buildNotification(count));
        }
    }

    private void request(String url) {
        queue.add(new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.i("Request", "OK!");
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.i("Request", "ERROR!");
                    }
                })
        );
    }
}