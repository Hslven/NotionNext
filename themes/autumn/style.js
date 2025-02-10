/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      :root {
        --content-width: 768px;
        --theme-color: #ff8200;
        --fg-color: #495057;
      }
      ::selection {
        background-color: var(--theme-color) !important;
        color: #fff !important;
      }

      .notion-h-title {
        color: #343a40;
        font-weight: bold;
      }
      .notion-text, .notion-list, .notion-toggle, .notion-to-do, .notion-quote,
      .notion-callout-text, .notion-simple-table-cell {
        letter-spacing: .5px;
        color: var(--fg-color);
        font-size: 1rem;
        font-weight: 400;
      }
      .notion-inline-code {
        background: rgba(255, 229, 100, .2);
        border-radius: 2px;
        color: var(--fg-color);
      }
      .notion-asset-wrapper img {
        border-radius: .6em;
      }

      .notion-quote {
        border-radius: 0;
        border-left: 3px solid var(--theme-color);
        background-color: rgba(238,241,225,0.3);
      }
      .notion-link {
        opacity: 1;
        color: #36563c;
        border-bottom: 1px dashed #36563c !important;
        transition: all .3s;
      }
      .notion-link:hover {
        color: var(--theme-color);
        border-bottom: 1px dashed var(--theme-color) !important;
      }
      .notion-bookmark {
        transition: all .3s;
      }
      .notion-bookmark:hover {
        border-color: var(--theme-color);
      }
      .notion-callout {
        border: 0;
      }

      .notion-property-checkbox-unchecked {
        border-radius: 2px;
        border: 1.3px solid var(--theme-color);
      }
      .notion-property-checkbox-checked {
        background: var(--theme-color);
        border-radius: 2px;
      }
      .notion-property-checkbox-checked .svg {
        width: 12px;
        height: 12px;
        top: 2px;
        left: 2px
      }

      .notion-toggle > summary::marker {
        # TODO gap between marker and text
      }

      .notion-list li {
        padding-left: 0.5rem;
      }
      .notion-list ol > ul {
        padding-left: 0;
      }
      .notion-list ul > ol {
        padding-left: 0;
      }
      .notion-list li::marker {
        color: var(--theme-color);
        font-weight: 600;
        letter-spacing: -1px;
      }
      .notion-table-of-contents-item {
        opacity: 1;
      }
    `}</style>
  )
}

export { Style }
