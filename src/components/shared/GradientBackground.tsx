import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Defs, Filter, FeGaussianBlur } from "react-native-svg";
import { COLORS } from "../../constants/theme";

const { width, height } = Dimensions.get("window");

type GradientBackgroundProps = {
  children: React.ReactNode;
  hideTopBlob?: boolean;
  hideBottomBlob?: boolean;
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  hideTopBlob = false,
  hideBottomBlob = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Base gradient background */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ scale: 1.35 }] },
        ]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#C9C9C9"]}
          style={{ flex: 1 }}
          start={{ x: 0.5, y: -0.03 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      {/* Top right coral blob */}
      {!hideTopBlob && (
        <View style={styles.topBlobContainer}>
          <Svg width='100%' height='100%' viewBox='-100 -100 429 362'>
            <Defs>
              <Filter
                id='blur-top'
                x='-150%'
                y='-150%'
                width='300%'
                height='300%'
              >
                <FeGaussianBlur in='SourceGraphic' stdDeviation='100' />
              </Filter>
            </Defs>
            <Path
              opacity='0.58'
              d='M40.7179 -59.1434C83.4801 -78.9131 129.368 -69.7687 178.141 -45.477C237.843 -15.7425 379.383 70.6323 368.13 133.368C360.384 176.557 303.131 162.718 265.632 139.297C160.739 73.7846 54.9063 82.3059 15.7641 37.116C-12.0089 5.05199 -0.61109 -40.0364 40.7179 -59.1434Z'
              fill={COLORS.primary.coral}
              filter='url(#blur-top)'
            />
          </Svg>
        </View>
      )}

      {/* Bottom left blue blob */}
      {!hideBottomBlob && (
        <View style={styles.bottomBlobContainer}>
          <Svg width='100%' height='100%' viewBox='-70 -110 347 294'>
            <Defs>
              <Filter
                id='blur-bottom'
                x='-150%'
                y='-150%'
                width='400%'
                height='400%'
              >
                <FeGaussianBlur in='SourceGraphic' stdDeviation='205' />
              </Filter>
            </Defs>
            <Path
              d='M49.3912 66.7844C9.38644 44.4047 -31.0057 2.04769 -47.3002 0.109092C-76.4743 -3.36183 -72.2079 76.9398 -41.3542 105.636C-12.4024 132.564 188.563 160.131 139.248 105.636C113.011 76.6442 83.4373 85.8306 49.3912 66.7844Z'
              fill='#0014FF'
              filter='url(#blur-bottom)'
            />
          </Svg>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  topBlobContainer: {
    position: "absolute",
    top: -height * 0.15,
    right: -width * 0.3,
    width: width * 1.2,
    height: height * 0.5,
  },
  bottomBlobContainer: {
    position: "absolute",
    bottom: -height * 0.15,
    left: -width * 0.3,
    width: width * 1.2,
    height: height * 0.5,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default GradientBackground;
