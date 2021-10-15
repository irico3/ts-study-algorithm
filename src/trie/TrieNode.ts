// トライ木で辞書を作ってみる


export default class TrieNode {
    // 保持する文字
    char: string 
    // 文字列の最後であるか。 car/carpetどちらも登録されている際に、切れ目がわかるように。
    isLastChar: boolean; 
    // 直下子ノード
    children: Map<string, TrieNode> 

    constructor(char?: string, isLastChar = false) {
        this.char = char
        this.isLastChar = isLastChar;
        this.children = new Map()
    }

    /** 直下子ノードの取得 */
    getChild(character: string) {
        return this.children.get(character)
    }

    /** 直下子ノードの追加 */ 
    addChild(character: string, isLastChar: boolean) {
        // ない場合は新規でNodeを作成
        if(!this.children.has(character)) {
            this.children.set(character, new TrieNode(character, isLastChar))
        }

        const childNode = this.children.get(character)

        childNode.isLastChar = childNode.isLastChar || isLastChar
        return childNode;
    }

    /** 直下子ノードの削除 */
    // 1.子コンポーネントを持たないこと
    // 2.isLastCharがfalseであること(deleteWordでisLastCharをはずす)
    removeChild(character: string) {
        const childNode = this.getChild(character)
        if(
            childNode
            && !childNode.isLastChar
            && !childNode.hasChildren()
        ) {
            this.children.delete(character)
        }
    }

    /** 該当ワードが存在するか */ 
    hasChild(character: string) {
        return this.children.has(character)
    }

    /** 子Nodeを持っているかどうか */
    hasChildren() {
        return this.children.size !== 0
    }
}