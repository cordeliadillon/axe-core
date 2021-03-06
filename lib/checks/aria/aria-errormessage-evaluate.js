import { lookupTable } from '../../commons/aria';
import { getRootNode } from '../../commons/dom';
import { tokenList } from '../../core/utils';

function ariaErrormessageEvaluate(node, options) {
	options = Array.isArray(options) ? options : [];

	const attr = node.getAttribute('aria-errormessage');
	const hasAttr = node.hasAttribute('aria-errormessage');

	const doc = getRootNode(node);

	function validateAttrValue(attr) {
		if (attr.trim() === '') {
			return lookupTable.attributes['aria-errormessage'].allowEmpty;
		}
		const idref = attr && doc.getElementById(attr);
		if (idref) {
			return (
				idref.getAttribute('role') === 'alert' ||
				idref.getAttribute('aria-live') === 'assertive' ||
				tokenList(node.getAttribute('aria-describedby') || '').indexOf(attr) >
					-1
			);
		}
	}

	// limit results to elements that actually have this attribute
	if (options.indexOf(attr) === -1 && hasAttr) {
		if (!validateAttrValue(attr)) {
			this.data(tokenList(attr));
			return false;
		}
	}

	return true;
}

export default ariaErrormessageEvaluate;
