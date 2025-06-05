import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  status: {
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statusPending: {
    backgroundColor: '#ffd600',
  },
  statusInProgress: {
    backgroundColor: '#2196f3',
  },
  statusCompleted: {
    backgroundColor: '#4caf50',
  },
  statusCancelled: {
    backgroundColor: '#f44336',
  },
});
