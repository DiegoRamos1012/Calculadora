import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  displayContainer: {
    flex: 2,
    justifyContent: "flex-end",
    backgroundColor: "#202020",
    padding: 20,
  },
  displayText: {
    color: "#fff",
    fontSize: 60,
    textAlign: "right",
  },
  previousText: {
    color: "#a0a0a0",
    fontSize: 30,
    textAlign: "right",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 5,
    backgroundColor: "#202020",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#3a3a3a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 28,
  },
  operatorButton: {
    backgroundColor: "#FF9500",
  },
  numberButton: {
    backgroundColor: "#313131",
  },
  functionButton: {
    backgroundColor: "#A0A0A0",
  },
  equalButton: {
    backgroundColor: "#FF9500",
  },
  zeroButton: {
    flex: 2,
  },
});
