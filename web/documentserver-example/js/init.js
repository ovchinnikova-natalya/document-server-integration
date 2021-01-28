﻿/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

function initEditor(docKey, mode, type) {
    //editor mode
    window.mode = window.mode || mode || "view";
    mode = window.mode;

    //editor type
    window.type = window.type || type || "desktop";
    type = window.type;

    //document url
    window.docUrl = document.getElementById("documentUrl").value;

    //key for caching and collaborate editing
    window.docKey = window.docKey || docKey || key(docUrl);
    docKey = window.docKey;

    //document type
    var docType = docUrl.substring(docUrl.lastIndexOf(".") + 1).trim().toLowerCase();
    var documentType = getDocumentType(docType);

    //creating object for editing
    new DocsAPI.DocEditor("placeholder",
        {
            type: type,
            width: (type == "desktop" ? "100%" : undefined),
            height: (type == "desktop" ? "100%" : undefined),
            documentType: documentType,
            document: {
                title: docUrl,
                url: docUrl,
                fileType: docType,
                key: docKey,
                permissions: {
                    edit: true
                }
            },
            editorConfig: {
                mode: mode,
            }
        });
}

//get document key from its url
function key(k) {
    var result = k.replace(new RegExp("[^0-9-.a-zA-Z_=]", "g"), "_") + (new Date()).getTime();
    return result.substring(result.length - Math.min(result.length, 20));
};

//get document type from the extension
var getDocumentType = function (ext) {
    if (".doc.docx.docm.dot.dotx.dotm.odt.fodt.ott.rtf.txt.html.htm.mht.pdf.djvu.fb2.epub.xps".indexOf(ext) != -1) return "text";
    if (".xls.xlsx.xlsm.xlt.xltx.xltm.ods.fods.ots.csv".indexOf(ext) != -1) return "spreadsheet";
    if (".pps.ppsx.ppsm.ppt.pptx.pptm.pot.potx.potm.odp.fodp.otp".indexOf(ext) != -1) return "presentation";
    return null;
};