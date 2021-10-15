import Trie from './Trie'

const trie = new Trie();

trie.insertWord('test')
trie.insertWord('tonight')
trie.insertWord('terser')

console.log(trie.doesWordExist('dog'))
console.log(trie.doesWordExist('tes'))
console.log(trie.doesWordExist('test'))
