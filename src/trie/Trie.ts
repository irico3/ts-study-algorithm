
import TrieNode from './TrieNode';

export default class Trie {
    head: TrieNode

    constructor() {
        this.head = new TrieNode();
    }
      /** 文字列の挿入 */
    insertWord(word: string) {
        const characters = Array.from(word)
        let currentNode = this.head

        for(let charIndex = 0; charIndex < word.length; charIndex++) {
            const isLastChar = charIndex === characters.length - 1
            currentNode = currentNode.addChild(characters[charIndex], isLastChar)
        }
    }

    /** 文字列の削除 */
    deleteWord(word: string) {
        const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
            // 指定単語の長さのスコープを抜けた場合は何もしない
            if(charIndex >= word.length) return

            const character = word[charIndex]
            const nextNode = currentNode.getChild(character)
            // トライ木にない文字がある場合はreturn
            if(nextNode == null) return

            depthFirstDelete(nextNode, charIndex + 1)

            // ここから先は、再帰なので文字末端から呼ばれていく

            // isLastCharをはずすことで削除可能にする
            if(charIndex === (word.length - 1)) {
                nextNode.isLastChar = false
            }

            currentNode.removeChild(character)

        }

        depthFirstDelete(this.head)

        return this
    }

    /** 指定単語が存在するかどうか */
    doesWordExist(word: string) {
        const lastCharacter = this.getLastCharacterNode(word)
        // 最後の文字のnodeがあり、最後の文字フラグが立っていればOKs
        return !!lastCharacter && lastCharacter.isLastChar
    }

    /** 最後の文字と紐づくNodeを取得 */
    private getLastCharacterNode(word: string) {
        const characters = Array.from(word)
        let currentNode = this.head

        for (let i = 0; i < characters.length; i++) {
            if(!currentNode.hasChild(characters[i])) return

            currentNode = currentNode.getChild(characters[i])
        }

        return currentNode
    }

}