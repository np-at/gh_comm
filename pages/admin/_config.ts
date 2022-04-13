import type { CmsConfig } from "netlify-cms-core";

const config: CmsConfig = {
  load_config_file: false,
  backend: {
    name: "git-gateway",
    branch: "main",
    squash_merges: true
  },
  media_folder: "/public/img",
  // public_folder: "/img",
  editor: {
    preview: false
  },
  collections: [
    {
      name: "pages",
      label: "Pages",
      files: [
        {
          label: "Home",
          name: "home",
          file: "content/home.md",
          fields: [
            {
              label: "picture",
              name: "picture",
              widget: "image",
              config: {
                choose_url: false
              }
            },
            {
              label: "Title",
              name: "title",
              widget: "text"
            },
            {
              label: "Content",
              name: "body",
              widget: "markdown",
              buttons: [
                "bold",
                "italic",
                "link",
                "code",
                "bulleted-list",
                "numbered-list",
                "heading-two",
                "heading-three",
                "heading-four",
                "quote"
              ]
            },
            {
              label: "slug",
              name: "slug",
              widget: "hidden",
              default: "/"
            }
          ]
        },
        {
          label: "About",
          name: "about",
          file: "content/about.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string"
            }
          ]
        }
      ]
    },
    {
      name: "gallery",
      label: "Gallery",
      folder: "content/gallery",
      media_folder: "/public/img/gallery",
      public_folder: "/img/gallery",
      create: true,
      nested: {
        depth: 2,
        // @ts-ignore - type info is out of date
        summary: "{{title}}"
      },
      // meta: {
      //   path: {
      //     widget: "string",
      //     label: "Path",
      //     index_file: "index"
      //   }
      // },
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string"
        },
        {
          label: "Description",
          name: "body",
          widget: "markdown"
        },
        {
          label: "Image",
          name: "image",
          widget: "image",
          media_folder: "/public/img/gallery"
        },
        {
          label: "Image Alt Text",
          name: "imageAlt",
          allow_multiple: false,
          widget: "string"
        },
        {
          label: "Card Background",
          name: "card_type",
          widget: "select",
          options: [
            {
              label: "White",
              value: "white"
            },
            {
              label: "Black",
              value: "black"
            }
          ],
          default: "white"
        },
        {
          label: "web_path",
          name: "slug",
          widget: "hidden",
          default: "gallery/{{slug}}"
        }
      ]
    },
    {
      name: "events",
      label: "Timeline / Life Events",
      folder: "content/events",
      create: true,
      preview_path: "/timeline/{{slug}}",
      summary: "{{title}} - {{date | date('MMMM YYYY')}}",

      sortable_fields: ["date", "title"],
      fields: [
        {
          name: "title",
          label: "Title",
          widget: "string"
        },
        {
          name: "date",
          label: "Date",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          default: "",
          time_format: false
        },
        {
          name: "body",
          label: "Content",
          widget: "markdown"
        },
        {
          name: "excerpt",
          label: "Excerpt",
          widget: "text"
        },
        {
          name: "featured_image",
          label: "Featured Image",
          widget: "image",
          allow_multiple: false
        },
        {
          name: "tags",
          label: "Tags",
          required: false,
          widget: "relation",
          multiple: true,
          collection: "meta",
          file: "tags",
          search_fields: ["tags.*.name"],
          display_fields: ["tags.*.name"],
          value_field: "tags.*.slug"
        },
        {
          label: "slug",
          name: "slug",
          widget: "hidden",
          default: "/timeline/{{slug}}"
        }
      ]
    },
    //    {
    //      name: "comment_pages",
    //      label: "Comment Pages",
    //      description: "Comments",
    //      folder: "comments",
    //      publish: false,
    //      create: false,
    //      extension: "json",
    //      identifier_field: "page_name",
    ////      filter: {
    ////        field: "parentCommentId",
    ////        value: ""
    ////      },
    //      fields: [
    //        {
    //          name: "page_name",
    //          label: "Page Name",
    //          widget: "hidden",
    //          default: "{{file}}"
    //
    //        },
    //        {
    //          label: "Comments",
    //          name: "comments",
    //          widget: "list",
    //          summary: "{{fields.username}} - {{fields.date}}",
    //          collapsed:false,
    //          fields: [
    //
    //            {
    //              name: "id",
    //              label: "ID",
    //              widget: "string",
    //              required: true
    //            },
    //            {
    //              name: "parentId",
    //              label: "Parent Comment ID",
    //              widget: "hidden",
    //              default: "",
    //              required: false
    //            },
    //            {
    //              name: "content",
    //              label: "Content",
    //              widget: "markdown",
    //              required: true
    //            },
    //            {
    //              name: "username",
    //              label: "Username",
    //              widget: "string",
    //              required: true
    //            },
    //            {
    //              name: "date",
    //              label: "Date",
    ////          widget: "date",
    //              widget: "datetime",
    //              required: true
    //            },
    //            {
    //              name: "email",
    //              label: "Email",
    //              widget: "string",
    //              required: true
    //            },
    //            {
    //              name: "childrenIds",
    //              label: "Children",
    //              widget: "list",
    //              required: false,
    //              summary: "{{children}}",
    //
    ////              summary: "----{{fields.children.id}}-----",
    //              field: {
    //                name: "children",
    //                widget: "relation",
    //                collection: "comment_pages",
    //                value_field: "comments.*.id",
    //                search_fields: ["comments.*.username", "comments.*.content"],
    //                display_fields: ["comments.*.username", "comments.*.content"],
    //
    //              }
    //
    //            },
    //            {
    //              name: "children",
    //              widget: "hidden",
    //              label: "Children IDs",
    //              required: false,
    //              default: []
    //            }
    //          ]
    //
    //        }
    //
    //      ]
    //    },
    {
      name: "meta",
      label: "Meta",
      delete: false,
      editor: {
        preview: false
      },
      files: [
        {
          name: "tags",
          label: "Tags",
          file: "content/meta/tags.yml",
          description: "List of tags",
          fields: [
            {
              name: "tags",
              label: "Tags",
              label_singular: "Tag",
              widget: "list",
              fields: [
                {
                  label: "Slug",
                  name: "slug",
                  widget: "string",
                  hint: "The part of a URL identifies the tag"
                },
                {
                  label: "Display Name",
                  name: "name",
                  widget: "string",
                  hint: "Tag name for displaying on the site"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default config;
