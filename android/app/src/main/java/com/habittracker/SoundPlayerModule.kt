package com.habittracker

import android.media.MediaPlayer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SoundPlayerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  @ReactMethod
  fun playSound() {
    try {
      val sound = reactApplicationContext.assets.openFd("notification_sound.mp3")
      val mediaPlayer = MediaPlayer()
      mediaPlayer.setDataSource(sound.fileDescriptor, sound.startOffset, sound.length)
      mediaPlayer.prepare()
      mediaPlayer.setOnCompletionListener { it.release() }
      mediaPlayer.start()
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }
}
