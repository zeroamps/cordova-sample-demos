package org.apache.cordova.timer;

import android.content.Context;
import android.content.Intent;
import android.os.Build;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Timer extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            startCounterService();
            return true;
        } else if (action.equals("stop")) {
            stopCounterService();
            return true;
        }

        return false;
    }

    private void startCounterService() {
        Context context = this.cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(this.cordova.getActivity(), CounterService.class);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intent);
        } else {
            context.startService(intent);
        }
    }

    private void stopCounterService() {
        Context context = this.cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(this.cordova.getActivity(), CounterService.class);
        context.stopService(intent);
    }

}