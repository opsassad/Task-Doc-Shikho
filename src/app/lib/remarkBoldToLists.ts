import { visit } from 'unist-util-visit'
import type { Root, Paragraph, List, ListItem, Strong, Parent } from 'mdast'

function isBoldPrefixedParagraph(node: Paragraph): boolean {
  if (!node.children || node.children.length === 0) return false
  
  const firstChild = node.children[0]
  
  // Check if first child is strong (bold) text
  if (firstChild.type === 'strong') {
    const strongNode = firstChild as Strong
    if (strongNode.children && strongNode.children.length > 0) {
      const textNode = strongNode.children[0]
      if (textNode.type === 'text') {
        // Check if the bold text ends with a colon (like "Purpose:", "Data Source:", etc.)
        const text = textNode.value
        return text.includes(':') || text.length > 3 // Bold text that looks like a label
      }
    }
  }
  
  return false
}

function convertParagraphToListItem(paragraph: Paragraph): ListItem {
  return {
    type: 'listItem',
    spread: false,
    children: [paragraph]
  }
}

export default function remarkBoldToLists() {
  return (tree: Root) => {
    const boldParagraphs: { node: Paragraph; parent: Parent; index: number }[] = []
    
    // First pass: collect all bold-prefixed paragraphs
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (isBoldPrefixedParagraph(node) && typeof index === 'number' && parent) {
        boldParagraphs.push({ node, parent, index })
      }
    })
    
    // Group consecutive bold paragraphs
    const groups: { node: Paragraph; parent: Parent; index: number }[][] = []
    let currentGroup: { node: Paragraph; parent: Parent; index: number }[] = []
    
    boldParagraphs.forEach((item, i) => {
      if (i === 0 || 
          item.parent !== boldParagraphs[i - 1].parent || 
          item.index !== boldParagraphs[i - 1].index + 1) {
        // Start new group
        if (currentGroup.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = [item]
      } else {
        // Add to current group
        currentGroup.push(item)
      }
    })
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup)
    }
    
    // Convert groups to lists (in reverse order to maintain indices)
    groups.reverse().forEach(group => {
      if (group.length === 1) {
        // Single item - convert to list
        const { node, parent, index } = group[0]
        const listItem = convertParagraphToListItem(node)
        const list: List = {
          type: 'list',
          ordered: false,
          start: null,
          spread: false,
          children: [listItem]
        }
        parent.children[index] = list
      } else {
        // Multiple consecutive items - convert to single list
        const firstItem = group[0]
        const listItems = group.map(item => convertParagraphToListItem(item.node))
        const list: List = {
          type: 'list',
          ordered: false,
          start: null,
          spread: false,
          children: listItems
        }
        
        // Replace first paragraph with list
        firstItem.parent.children[firstItem.index] = list
        
        // Remove other paragraphs (in reverse order to maintain indices)
        for (let i = group.length - 1; i > 0; i--) {
          const item = group[i]
          item.parent.children.splice(item.index, 1)
        }
      }
    })
  }
} 