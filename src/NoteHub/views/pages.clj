(ns NoteHub.views.pages
  (:require [NoteHub.views.common :as common])
  (:use [noir.core :only [defpage]]
        [hiccup.form]
        [markdown :only [md-to-html-string]]))

(defpage "/" {}
         (common/layout "Free Markdown Hosting"
           [:div#hero
            [:h1 "NoteHub"]
            [:h2 "Free hosting for markdown pages."]
            [:br]
            [:br]
            [:a.button {:href "/new"} "New Page"]]))

(defpage "/new" {}
         (common/layout "New Markdown Note"
           [:div.central-body
            (form-to [:post "/preview-note"]
              (text-area {:class "max-width"} :draft)
              (submit-button {:id "preview-button"} "Preview"))]))

; Actions.

(defpage [:post "/preview-note"] {:keys [draft]}
         (common/layout "Preview of ..."
            [:article.central-body
             (md-to-html-string draft)])) 
