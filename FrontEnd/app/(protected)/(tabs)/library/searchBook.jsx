import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Dimensions
} from 'react-native';
import { Search, ChevronDown } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBooks from '../../../../hooks/useBooks';
import CardCustom from '../../../../components/CardCustom';
const { width } = Dimensions.get('window');

const SearchBook = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const { books, loading } = useBooks();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('bookSearchHistory');
        if (savedHistory) {
          setSearchHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadHistory();
  }, []);

  const searchBooks = (query) => {
    if (!query.trim() || !books) return null;

    const lowerQuery = query.toLowerCase();
    const allBooks = [
      ...(books.booksLoans || []),
      ...(books.booksReserves || []),
    ];

    return allBooks.filter(book =>
      book.nameBook.toLowerCase().includes(lowerQuery) ||
      book.authorBook.toLowerCase().includes(lowerQuery)
    );
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;

    const results = searchBooks(searchText);
    setSearchResults(results);
    setShowResults(true);

    // Atualiza o histórico
    const existingIndex = searchHistory.findIndex(item => item.text === searchText.trim());

    let updatedHistory;

    if (existingIndex !== -1) {
      updatedHistory = [
        {...searchHistory[existingIndex], date: new Date().toLocaleString()},
        ...searchHistory.filter((_, i) => i !== existingIndex)
      ];
    } else {
      updatedHistory = [
        {
          id: Date.now().toString(),
          text: searchText.trim(),
          date: new Date().toLocaleString()
        },
        ...searchHistory
      ];
    }

    setSearchHistory(updatedHistory.slice(0, 20));
    AsyncStorage.setItem('bookSearchHistory', JSON.stringify(updatedHistory.slice(0, 20)));
    setSearchText('');
  };

  const backToHistory = () => {
    setShowResults(false);
  };

  if (loading || loadingHistory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003B73" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa compacta */}
      <View style={styles.searchBar}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Buscar livros..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Conteúdo principal ajustado */}
      <View style={styles.contentContainer}>
        {showResults && searchResults ? (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
              </Text>
              <TouchableOpacity onPress={backToHistory} style={styles.backButton}>
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.idLibrary.toString()}
              renderItem={({ item }) => <CardCustom data={[item]} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
            />
          </View>
        ) : (
          <View style={styles.historyContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Histórico</Text>
              {searchHistory.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchHistory([]);
                    AsyncStorage.removeItem('bookSearchHistory');
                  }}
                >
                  <Text style={styles.clearText}>Limpar</Text>
                </TouchableOpacity>
              )}
            </View>

            {searchHistory.length > 0 ? (
              <FlatList
                data={searchHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={styles.historyText}>{item.text}</Text>
                    <TouchableOpacity
                      style={styles.repeatButton}
                      onPress={() => {
                        setSearchText(item.text);
                        const results = searchBooks(item.text);
                        setSearchResults(results);
                        setShowResults(true);
                      }}
                    >
                      <ChevronDown size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={styles.historyList}
              />
            ) : (
              <Text style={styles.emptyText}>Nenhuma pesquisa recente</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B73',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#003B73',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
        marginTop: 70,

    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
    fontFamily: 'System',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  backButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  backText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    paddingBottom: 490,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  clearText: {
    color: '#60A3D9',
    fontSize: 14,
    fontWeight: '500',
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
    marginRight: 10,
    fontWeight: '500',
  },
  historyList: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: width * 0.7,
  },
});

export default SearchBook;