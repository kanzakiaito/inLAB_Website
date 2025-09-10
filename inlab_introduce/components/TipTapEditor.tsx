import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import Blockquote from '@tiptap/extension-blockquote';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function Dropdown({ trigger, children, isOpen, onToggle }: DropdownProps) {
  return (
    <div className="relative">
      <button type="button" onClick={onToggle} className="px-3 py-1 hover:bg-gray-200 rounded">
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-48">
          {children}
        </div>
      )}
    </div>
  );
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const [mounted, setMounted] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    setMounted(true);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Table.configure({ 
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 25,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic text-gray-600',
        },
      }),
      CharacterCount,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] outline-none p-4',
      },
    },
    immediatelyRender: false,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const insertImage = () => {
    // Create a modal-like interface for image options
    const choice = window.confirm('Choose image source:\nOK = Upload File\nCancel = Enter URL');
    
    if (choice) {
      // File upload option
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = false;
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert('File size too large. Please choose an image under 5MB.');
            return;
          }
          
          // Validate file type
          if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (e) => {
            const src = e.target?.result as string;
            if (src && editor) {
              editor.chain().focus().setImage({ 
                src,
                alt: file.name,
                title: file.name 
              }).run();
            }
          };
          reader.onerror = () => {
            alert('Error reading file. Please try again.');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // URL input option
      const url = window.prompt('Enter image URL:');
      if (url && editor) {
        // Basic URL validation
        try {
          new URL(url);
          const alt = window.prompt('Enter image description (optional):') || 'Image';
          editor.chain().focus().setImage({ 
            src: url,
            alt: alt,
            title: alt 
          }).run();
        } catch {
          alert('Please enter a valid URL.');
        }
      }
    }
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    
    if (url === null) {
      return;
    }
    
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertImageFromFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size too large. Please choose an image under 5MB.');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file.');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          if (src && editor) {
            editor.chain().focus().setImage({ 
              src,
              alt: file.name,
              title: file.name 
            }).run();
          }
        };
        reader.onerror = () => {
          alert('Error reading file. Please try again.');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const insertImageFromUrl = () => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      // Basic URL validation
      try {
        new URL(url);
        const alt = window.prompt('Enter image description (optional):') || 'Image';
        editor.chain().focus().setImage({ 
          src: url,
          alt: alt,
          title: alt 
        }).run();
      } catch {
        alert('Please enter a valid URL.');
      }
    }
  };

  const insertCallout = (type: 'info' | 'warning' | 'success' | 'error' | 'tip') => {
    const icons = {
      info: '💡',
      warning: '⚠️',
      success: '✅',
      error: '❌',
      tip: '💡'
    };
    
    const colors = {
      info: 'border-blue-200 bg-blue-50',
      warning: 'border-yellow-200 bg-yellow-50',
      success: 'border-green-200 bg-green-50',
      error: 'border-red-200 bg-red-50',
      tip: 'border-purple-200 bg-purple-50'
    };
    
    const calloutHtml = `
      <div class="callout ${colors[type]} border-l-4 p-4 my-4 rounded-r-lg">
        <div class="flex items-start gap-3">
          <span class="text-lg flex-shrink-0">${icons[type]}</span>
          <div class="flex-1">
            <div class="font-semibold text-gray-800 mb-1 capitalize">${type}</div>
            <div class="text-gray-700">Your content here...</div>
          </div>
        </div>
      </div>
    `;
    
    editor?.chain().focus().insertContent(calloutHtml).run();
  };

  const addFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // For demo purposes, we'll insert a link to the filename
        const fileName = file.name;
        editor?.chain().focus().insertContent(`<a href="#" title="File: ${fileName}" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"><span>📎</span> ${fileName}</a>`).run();
      }
    };
    input.click();
  };

  if (!mounted) return null;

  return (
    <div className="border rounded-lg bg-white shadow-lg w-full overflow-hidden">
      {/* Modern Toolbar */}
      {editor && (
        <div className="bg-gray-50 border-b">
          {/* Top toolbar row */}
          <div className="flex items-center px-3 py-2 gap-1 flex-wrap">
            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().undo().run();
                }} 
                className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                title="Undo (Ctrl+Z)"
                disabled={!editor.can().undo()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                </svg>
              </button>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().redo().run();
                }} 
                className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                title="Redo (Ctrl+Y)"
                disabled={!editor.can().redo()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Format dropdown */}
            <select 
              className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              value={
                editor.isActive('heading', { level: 1 }) ? 'h1' :
                editor.isActive('heading', { level: 2 }) ? 'h2' :
                editor.isActive('heading', { level: 3 }) ? 'h3' :
                editor.isActive('heading', { level: 4 }) ? 'h4' :
                editor.isActive('heading', { level: 5 }) ? 'h5' :
                editor.isActive('heading', { level: 6 }) ? 'h6' : 'p'
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'p') {
                  editor.chain().focus().setParagraph().run();
                } else {
                  const level = parseInt(value.replace('h', ''));
                  editor.chain().focus().toggleHeading({ level: level as any }).run();
                }
              }}
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
            </select>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Text formatting */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('bold') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Bold (Ctrl+B)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                </svg>
              </button>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('italic') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Italic (Ctrl+I)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
                </svg>
              </button>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleUnderline().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('underline') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Underline (Ctrl+U)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
                </svg>
              </button>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleStrike().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('strike') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Strikethrough"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.18.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13-.35-.09-.65-.22-.89-.39-.25-.17-.44-.37-.59-.61-.14-.24-.25-.50-.25-.78H7.39c0 .05.01.09.01.13.07.5.21.96.45 1.38.24.42.57.79.99 1.09.42.3.92.54 1.52.71.59.17 1.25.25 1.98.25.74 0 1.41-.09 2.02-.26.61-.17 1.14-.41 1.59-.73.45-.32.8-.71 1.04-1.17.25-.46.37-.97.37-1.52 0-.51-.13-.97-.38-1.38-.26-.41-.61-.77-1.07-1.07l-.46-.21H21z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Text color and highlight */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleHighlight().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('highlight') 
                    ? 'bg-yellow-100 text-yellow-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Highlight"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 14l3 3-3 3h18v-2l-8-8-10 4zm7.5-7.5L17 10l4-4-3.5-3.5-4 4zm-5 1L10 9l4-4L12.5 3.5 8.5 7.5z"/>
                </svg>
              </button>
              
              {/* Callouts dropdown */}
              <div className="relative" data-dropdown>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown('callouts');
                  }}
                  className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                  title="Insert Callout"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
                {openDropdown === 'callouts' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-20 min-w-48">
                    <div className="py-1">
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertCallout('tip'); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">💡</span> Tip
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertCallout('info'); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">ℹ️</span> Info
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertCallout('warning'); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">⚠️</span> Warning
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertCallout('success'); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">✅</span> Success
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertCallout('error'); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">❌</span> Error
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBlockquote().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('blockquote') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Quote"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Lists */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBulletList().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('bulletList') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Bullet List"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                </svg>
              </button>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleOrderedList().run();
                }} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive('orderedList') 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Numbered List"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Alignment */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => editor.chain().focus().setTextAlign('left').run()} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive({ textAlign: 'left' }) 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Align Left"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
                </svg>
              </button>
              <button 
                onClick={() => editor.chain().focus().setTextAlign('center').run()} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive({ textAlign: 'center' }) 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Align Center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
                </svg>
              </button>
              <button 
                onClick={() => editor.chain().focus().setTextAlign('right').run()} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive({ textAlign: 'right' }) 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Align Right"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
                </svg>
              </button>
              <button 
                onClick={() => editor.chain().focus().setTextAlign('justify').run()} 
                className={`p-2 rounded transition-colors ${
                  editor.isActive({ textAlign: 'justify' }) 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title="Justify"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Insert elements */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setLink();
                }} 
                className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                title="Insert Link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                </svg>
              </button>
              
              {/* Image dropdown */}
              <div className="relative" data-dropdown>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown('image');
                  }}
                  className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                  title="Insert Image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </button>
                {openDropdown === 'image' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-20 min-w-48">
                    <div className="py-1">
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertImageFromFile(); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">📁</span> Upload Image
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          insertImageFromUrl(); 
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">🔗</span> Image from URL
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  insertTable();
                }} 
                className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                title="Insert Table"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/>
                </svg>
              </button>
              
              {/* Table management dropdown */}
              <div className="relative" data-dropdown>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown('table');
                  }}
                  className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                  title="Table Options"
                  disabled={!editor?.isActive('table')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 2h14v2H5V7zm0 4h4v2H5v-2zm6 0h8v2h-8v-2zm-6 4h4v2H5v-2zm6 0h8v2h-8v-2z"/>
                  </svg>
                </button>
                {openDropdown === 'table' && editor?.isActive('table') && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-20 min-w-48">
                    <div className="py-1">
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().addColumnBefore().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">⬅️</span> Add Column Before
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().addColumnAfter().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">➡️</span> Add Column After
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().addRowBefore().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">⬆️</span> Add Row Above
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().addRowAfter().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        <span className="mr-2">⬇️</span> Add Row Below
                      </button>
                      <div className="border-t my-1"></div>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().deleteColumn().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <span className="mr-2">🗑️</span> Delete Column
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().deleteRow().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <span className="mr-2">🗑️</span> Delete Row
                      </button>
                      <div className="border-t my-1"></div>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().deleteTable().run();
                          setOpenDropdown(null); 
                        }} 
                        className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <span className="mr-2">❌</span> Delete Table
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addFile();
                }} 
                className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
                title="Insert File"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* More options */}
            <button 
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} 
              className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
              title="Clear Formatting"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5v.18L8.82 8h2.4l-.72 1.68-.9-.9L9.14 9h-.32L6 5.82V5H3.27L2 6.27 6.73 11 8 9.73l1.85 1.85L12 9.43 17.73 15.16 19 13.89 9.89 4.78 11.07 3.61C10.96 3.47 10.83 3.34 10.69 3.23L6 5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="min-h-[500px] bg-white w-full relative">
        {/* Character count */}
        {editor && (
          <div className="absolute bottom-2 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm">
            {editor.storage.characterCount?.characters() || 0} characters
          </div>
        )}
        
        {/* Enhanced styles for TipTap content */}
        <style>{`
          .tiptap-content {
            line-height: 1.6;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 100%;
            min-height: 500px;
            padding: 20px;
          }
          .tiptap-content h1 { 
            font-size: 2em; 
            font-weight: bold; 
            margin: 1em 0 0.5em 0;
            line-height: 1.2;
          }
          .tiptap-content h2 { 
            font-size: 1.5em; 
            font-weight: bold; 
            margin: 0.8em 0 0.4em 0;
            line-height: 1.3;
          }
          .tiptap-content h3 { 
            font-size: 1.2em; 
            font-weight: bold; 
            margin: 0.6em 0 0.3em 0;
            line-height: 1.4;
          }
          .tiptap-content p {
            margin: 0.5em 0;
          }
          .tiptap-content ul { 
            list-style: disc; 
            margin: 0.5em 0;
            padding-left: 1.5em;
          }
          .tiptap-content ol { 
            list-style: decimal; 
            margin: 0.5em 0;
            padding-left: 1.5em;
          }
          .tiptap-content li { 
            margin: 0.2em 0;
          }
          .tiptap-content b, .tiptap-content strong { 
            font-weight: bold; 
          }
          .tiptap-content i, .tiptap-content em { 
            font-style: italic; 
          }
          .tiptap-content u { 
            text-decoration: underline; 
          }
          .tiptap-content table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 1em 0;
            border: 1px solid #e5e7eb;
          }
          .tiptap-content th, .tiptap-content td { 
            border: 1px solid #e5e7eb; 
            padding: 8px 12px;
            text-align: left;
          }
          .tiptap-content th { 
            background: #f9fafb;
            font-weight: 600;
          }
          .tiptap-content img { 
            max-width: 100%; 
            height: auto; 
            margin: 1em 0;
            border-radius: 4px;
          }
          .tiptap-content a { 
            color: #2563eb; 
            text-decoration: underline;
          }
          .tiptap-content a:hover {
            color: #1d4ed8;
          }
          .tiptap-content code {
            background: #f3f4f6;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
          }
          .tiptap-content pre {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1em 0;
          }
          .tiptap-content blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 16px;
            margin: 1em 0;
            color: #6b7280;
            font-style: italic;
          }
          
          /* Callout Styles */
          .tiptap-content .callout {
            margin: 1em 0;
            border-radius: 0.5rem;
            border-left-width: 4px;
            padding: 1rem;
          }
          .tiptap-content .callout.border-blue-200.bg-blue-50 {
            border-left-color: #93c5fd;
            background-color: #eff6ff;
          }
          .tiptap-content .callout.border-yellow-200.bg-yellow-50 {
            border-left-color: #fde047;
            background-color: #fefce8;
          }
          .tiptap-content .callout.border-green-200.bg-green-50 {
            border-left-color: #86efac;
            background-color: #f0fdf4;
          }
          .tiptap-content .callout.border-red-200.bg-red-50 {
            border-left-color: #fca5a5;
            background-color: #fef2f2;
          }
          .tiptap-content .callout.border-purple-200.bg-purple-50 {
            border-left-color: #c084fc;
            background-color: #faf5ff;
          }
          .tiptap-content .callout .flex {
            display: flex;
          }
          .tiptap-content .callout .items-start {
            align-items: flex-start;
          }
          .tiptap-content .callout .gap-3 {
            gap: 0.75rem;
          }
          .tiptap-content .callout .text-lg {
            font-size: 1.125rem;
          }
          .tiptap-content .callout .flex-shrink-0 {
            flex-shrink: 0;
          }
          .tiptap-content .callout .flex-1 {
            flex: 1 1 0%;
          }
          .tiptap-content .callout .font-semibold {
            font-weight: 600;
          }
          .tiptap-content .callout .text-gray-800 {
            color: #1f2937;
          }
          .tiptap-content .callout .mb-1 {
            margin-bottom: 0.25rem;
          }
          .tiptap-content .callout .capitalize {
            text-transform: capitalize;
          }
          .tiptap-content .callout .text-gray-700 {
            color: #374151;
          }
        `}</style>
        {editor && <EditorContent editor={editor} className="tiptap-content" />}
      </div>
    </div>
  );
}
