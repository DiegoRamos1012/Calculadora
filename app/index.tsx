import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";

export default function CalculadoraScreen() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string>("");
  const [operation, setOperation] = useState<string | null>(null);
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  // Formata o número para exibição, limitando casas decimais e tratando números grandes
  const formatDisplayNumber = (value: string): string => {
    // Verifica se é um número inválido
    if (value === "NaN" || value === "Infinity" || value === "-Infinity") {
      return "Erro";
    }

    let number = parseFloat(value);

    // Verifica se o número é muito grande para exibição
    if (Math.abs(number) > 999999999) {
      return number.toExponential(2);
    }

    // Formata o número, removendo zeros à direita em números decimais
    const formattedValue = value.includes(".")
      ? parseFloat(value).toString()
      : value;

    // Limita o tamanho para caber na tela
    return formattedValue.length > 10 ? number.toPrecision(9) : formattedValue;
  };

  // Manipulador de pressão de botão
  const handleButtonPress = (value: string) => {
    // Se estamos esperando um novo operando, limpa o display
    if (waitingForOperand) {
      setDisplayValue(value);
      setWaitingForOperand(false);
      return;
    }

    // Tratamento do botão +/-
    if (value === "+/-") {
      setDisplayValue((parseFloat(displayValue) * -1).toString());
      return;
    }

    // Tratamento do botão %
    if (value === "%") {
      const result = parseFloat(displayValue) / 100;
      setDisplayValue(formatDisplayNumber(result.toString()));
      return;
    }

    // Impede múltiplos pontos decimais
    if (value === "." && displayValue.includes(".")) {
      return;
    }

    if (displayValue === "0" || displayValue === "Erro") {
      // Substitui o zero inicial ou mensagem de erro
      setDisplayValue(value === "." ? "0." : value);
    } else {
      // Concatena o valor pressionado
      setDisplayValue(displayValue + value);
    }
  };

  // Manipulador de operação
  const handleOperation = (op: string) => {
    // Verificar se temos um erro
    if (displayValue === "Erro") {
      handleClear();
      return;
    }

    const currentNumber = parseFloat(displayValue);

    if (previousNumber === null) {
      // Primeiro número da operação
      setPreviousNumber(currentNumber);
    } else if (operation && !waitingForOperand) {
      // Já temos um número anterior e uma operação, realizar cálculo
      const result = performCalculation(
        previousNumber,
        currentNumber,
        operation
      );
      setPreviousNumber(result);
      setDisplayValue(formatDisplayNumber(result.toString()));
    }

    // Configura para a próxima operação
    setOperation(op);
    setPreviousValue(
      `${previousNumber !== null ? previousNumber : currentNumber} ${op}`
    );
    setWaitingForOperand(true);
  };

  // Função auxiliar para realizar os cálculos
  const performCalculation = (
    num1: number,
    num2: number,
    op: string
  ): number => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return num2 !== 0 ? num1 / num2 : NaN; // Retorna NaN para divisão por zero
      default:
        return num2;
    }
  };

  // Manipulador de igualdade
  const handleEquals = () => {
    // Verificar se temos um erro
    if (displayValue === "Erro") {
      handleClear();
      return;
    }

    const currentNumber = parseFloat(displayValue);

    if (previousNumber !== null && operation) {
      // Realiza o cálculo
      const result = performCalculation(
        previousNumber,
        currentNumber,
        operation
      );

      // Atualiza o histórico e o display
      setPreviousValue(`${previousNumber} ${operation} ${currentNumber} =`);
      setDisplayValue(formatDisplayNumber(result.toString()));

      // Reseta o estado para uma nova operação
      setPreviousNumber(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Manipulador de limpeza
  const handleClear = () => {
    setDisplayValue("0");
    setPreviousValue("");
    setPreviousNumber(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.previousText}>{previousValue}</Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        {/* Linha 1 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={() => handleClear()}
          >
            <Text style={styles.buttonText}>C</Text>
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
