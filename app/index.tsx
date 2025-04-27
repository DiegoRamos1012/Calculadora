import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";

export default function CalculadoraScreen() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");

  // Placeholder para o manipulador de pressão de botão
  const handleButtonPress = (value: string) => {
    // Este é apenas um espaço reservado - a implementação real lidaria com operações da calculadora
    if (displayValue === "0") {
      setDisplayValue(value);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  // Placeholder para o manipulador de operação
  const handleOperation = (operation: string) => {
    setPreviousValue(displayValue + " " + operation);
    setDisplayValue("0");
  };

  // Placeholder para o manipulador de igualdade
  const handleEquals = () => {
    // Implementaria a lógica de cálculo real aqui
    setPreviousValue(previousValue + " " + displayValue + " =");
    setDisplayValue("0");
  };

  // Placeholder para o manipulador de limpeza
  const handleClear = () => {
    setDisplayValue("0");
    setPreviousValue("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.previousText}>{previousValue}</Text>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        {/* Linha 1 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={() => handleClear()}
          >
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={() => handleButtonPress("+/-")}
          >
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={() => handleButtonPress("%")}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperation("÷")}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperation("×")}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 3 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperation("-")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 4 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperation("+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 5 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton, styles.zeroButton]}
            onPress={() => handleButtonPress("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleButtonPress(".")}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.equalButton]}
            onPress={() => handleEquals()}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
