package com.github.enderdeveloper.util;

import org.joml.Vector3d;
import org.joml.Vector3dc;

public final class SmoothingMath {
    public static final int MIN_DURATION_MS = 180;
    public static final int DEFAULT_DURATION_MS = 320;
    public static final int MAX_DURATION_MS = 650;

    private SmoothingMath() {
    }

    public static int clampDurationMs(int durationMs) {
        return Math.max(MIN_DURATION_MS, Math.min(MAX_DURATION_MS, durationMs));
    }

    public static float durationSeconds(int durationMs) {
        return clampDurationMs(durationMs) / 1000.0f;
    }

    public static float normalizedProgress(float elapsedSeconds, float durationSeconds) {
        if (durationSeconds <= 0.0f) {
            return 1.0f;
        }

        return clamp01(elapsedSeconds / durationSeconds);
    }

    public static float easeInOutCubic(float progress) {
        float t = clamp01(progress);
        if (t < 0.5f) {
            return 4.0f * t * t * t;
        }

        float shifted = -2.0f * t + 2.0f;
        return 1.0f - (shifted * shifted * shifted) / 2.0f;
    }

    public static Vector3d interpolate(Vector3dc start, Vector3dc end, float progress) {
        return interpolate(start, end, progress, new Vector3d());
    }

    public static Vector3d interpolate(Vector3dc start, Vector3dc end, float progress, Vector3d destination) {
        float t = clamp01(progress);
        return destination.set(
                lerp(start.x(), end.x(), t),
                lerp(start.y(), end.y(), t),
                lerp(start.z(), end.z(), t)
        );
    }

    private static double lerp(double start, double end, float progress) {
        return start + ((end - start) * progress);
    }

    private static float clamp01(float value) {
        return Math.max(0.0f, Math.min(1.0f, value));
    }
}
