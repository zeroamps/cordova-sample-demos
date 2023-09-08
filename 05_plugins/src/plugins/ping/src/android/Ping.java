package org.apache.cordova.ping;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Ping extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            startCounterService(args.getString(0));
            return true;
        } else if (action.equals("stop")) {
            stopCounterService();
            return true;
        }

        return false;
    }

    private void startCounterService(String url) {
        Context context = this.cordova.getActivity().getApplicationContext();

        Intent intent = new Intent(this.cordova.getActivity(), CounterService.class);
        Bundle bundle = new Bundle();
        bundle.putString("url", url);
        intent.putExtras(bundle);

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