/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*
    *
    * Wijmo Library 5.20162.207
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */

var __extends,wijmo;(function(n){'use strict';function at(){return lt}function a(n,t){return n==null?null:f(t)?h(n.implementsInterface)&&n.implementsInterface(t)?n:null:n instanceof t?n:null}function yt(n){return f(n)||e(n)||l(n)||u(n)}function f(n){return typeof n=='string'}function pt(n){return n==null?!0:n.replace(/\s/g,'').length<1}function e(n){return typeof n=='number'}function b(n){return e(n)&&n==Math.round(n)}function l(n){return typeof n=='boolean'}function h(n){return typeof n=='function'}function wt(n){return typeof n=='undefined'}function u(n){return n instanceof Date&&!isNaN(n.getTime())}function o(n){return n instanceof Array}function v(n){return n!=null&&typeof n=='object'&&!u(n)&&!o(n)}function bt(n){if(n instanceof c)return n;if(n.touches&&n.touches.length>0&&(n=n.touches[0]),e(n.clientX)&&e(n.clientY))return new c(n.clientX+pageXOffset,n.clientY+pageYOffset);throw'Mouse or touch event expected.';}function kt(n){return e(n)?r.Number:l(n)?r.Boolean:u(n)?r.Date:f(n)?r.String:o(n)?r.Array:r.Object}function k(t,i,u){var o,e;if(t!=null){if(f(t))switch(i){case r.Number:return o=n.Globalize.parseFloat(t,u),isNaN(o)?t:o;case r.Date:return e=n.Globalize.parseDate(t,u),e||u||!t||(e=new Date(t)),e&&isFinite(e.getTime())?e:t;case r.Boolean:switch(t.toLowerCase()){case'true':return!0;case'false':return!1}return t}if(i==r.String)return n.Globalize.format(t,u)}return t}function dt(n,t,i){var u,r;return i?(r=n.toString(),u=r.indexOf('.'),u>-1&&(r=r.substr(0,u+1+t),n=parseFloat(r))):(r=n.toFixed(t),n=parseFloat(r)),n}function gt(t,i,r){return t=y(t),t.replace(/\{(.*?)(:(.*?))?\}/g,function(t,u,f,e){var o=t;return u&&u[0]!='{'&&i&&(o=i[u],e&&(o=n.Globalize.format(o,e)),r&&(o=r(i,u,e,o))),o==null?'':o})}function ni(n,t,i){return n!=null&&(i!=null&&n>i&&(n=i),t!=null&&n<t&&(n=t)),n}function d(i,r){var u,f;if(r)for(u in r)u[0]!='_'&&(t(u in i,'Unknown property "'+u+'".'),f=r[u],i._copy&&i._copy(u,f)||(i[u]instanceof n.Event&&h(f)?i[u].addHandler(f):v(f)&&i[u]&&u!='itemsSource'?d(i[u],f):i[u]=f))}function t(n,t){if(!n)throw'** Assertion failed in Wijmo: '+t;}function ti(n,t){console.error('** WARNING: "'+n+'" has been deprecated; please use "'+t+'" instead.')}function y(n,i){return i===void 0&&(i=!0),t(i&&n==null||f(n),'String expected.'),n}function i(n,i,r){if(i===void 0&&(i=!1),r===void 0&&(r=!1),t(i&&n==null||e(n),'Number expected.'),r&&n&&n<0)throw'Positive number expected.';return n}function ii(n,i,r){if(i===void 0&&(i=!1),r===void 0&&(r=!1),t(i&&n==null||b(n),'Integer expected.'),r&&n&&n<0)throw'Positive integer expected.';return n}function g(n,i){return i===void 0&&(i=!1),t(i&&n==null||l(n),'Boolean expected.'),n}function ri(n,i){if(i===void 0&&(i=!1),f(n)){var e=k(n,r.Date,'r');u(e)&&(n=e)}return t(i&&n==null||u(n),'Date expected.'),n}function s(n,i){return i===void 0&&(i=!0),t(i&&n==null||h(n),'Function expected.'),n}function ui(n,i){return i===void 0&&(i=!0),t(i&&n==null||o(n),'Array expected.'),n}function nt(n,i,r){return r===void 0&&(r=!1),n=a(n,i),t(r||n!=null,i+' expected.'),n}function fi(n,i,r){if(r===void 0&&(r=!1),n==null&&r)return null;var u=i[n];return t(u!=null,'Invalid enum value.'),e(u)?u:n}function ei(i,r){if(r===void 0&&(r=!0),i==null&&r)return null;var u=a(i,'ICollectionView');return u!=null?u:(o(i)||t(!1,'Array or ICollectionView expected.'),new n.collections.CollectionView(i))}function oi(n){return n&&n.items&&n.items.length}function si(n){return n&&n.length?n[0].toUpperCase()+n.substr(1).replace(/([a-z])([A-Z])/g,'$1 $2'):''}function hi(n){return f(n)&&(n=n.replace(/[&<>"'\/]/g,function(n){return tt[n]})),n}function p(n,t){if(n&&n.getAttribute){var i=new RegExp('\\b'+t+'\\b');return n&&i.test(n.getAttribute('class'))}return!1}function it(n,t){if(n&&t&&n.setAttribute&&p(n,t)){var i=new RegExp('\\s?\\b'+t+'\\b','g'),r=n.getAttribute('class');n.setAttribute('class',r.replace(i,''))}}function rt(n,t){if(n&&t&&n.setAttribute&&!p(n,t)){var i=n.getAttribute('class');n.setAttribute('class',i?i+' '+t:t)}}function ut(n,t,i){i?rt(n,t):it(n,t)}function ci(n,t,r){if(r===void 0&&(r=t),n=nt(n,HTMLInputElement),et(document.body,n)&&!n.disabled&&n.style.display!='none')try{n.focus();n.setSelectionRange(i(t),i(r))}catch(u){}}function ft(){var n=document.activeElement,t;return n&&(t=n.shadowRoot,t&&t.activeElement&&(n=t.activeElement)),n}function li(n,t){for(var f,i,e=n.querySelectorAll('input,select,textarea,button,a,div,span'),r=[],u=0;u<e.length;u++)i=e[u],!i.disabled&&i.tabIndex>-1&&i.clientHeight>0&&!ot(i,'[disabled],.wj-state-disabled')&&r.push(i);f=0;t&&(u=r.indexOf(ft()),u>-1&&(f=(u+t+r.length)%r.length));f<r.length&&(i=r[f],i.focus(),i instanceof HTMLInputElement&&i.select())}function ai(n){return n instanceof Element?n:f(n)?document.querySelector(n):n&&n.jquery?n[0]:null}function vi(n,t){var i=document.createElement('div'),r;return i.innerHTML=n,r=i.removeChild(i.firstChild),t instanceof HTMLElement?t.appendChild(r):r}function yi(n,t){if(t==null){n.hasChildNodes()&&(n.textContent='');return}var i=n.firstChild;n.childNodes.length==1&&i.nodeType==3?i.nodeValue!=t&&(i.nodeValue=t):(i||t)&&(n.textContent=t)}function et(n,t){for(var i=t;i&&n;){if(i===n)return!0;i=i.parentNode||i.host}return!1}function ot(n,t){var i=n?n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector:null;if(i)for(;n;n=n.parentNode)if(n instanceof Element&&i.call(n,t))return n;return null}function pi(n,t){var r,i,u;for(ut(n,'wj-state-disabled',!t),t?n.removeAttribute('disabled'):n.setAttribute('disabled','true'),r=n.querySelectorAll('input'),i=0;i<r.length;i++)u=r[i],t?u.removeAttribute('disabled'):u.setAttribute('disabled','true')}function wi(n){var t=n.getBoundingClientRect();return new w(t.left+pageXOffset,t.top+pageYOffset,t.width,t.height)}function st(n,t){var u,i,r;if(o(n)){n.forEach(function(n){st(n,t)});return}u=n.style;for(i in t)r=t[i],typeof r=='number'&&i.match(/width|height|left|top|right|bottom|size|padding|margin'/i)&&(r+='px'),u[i]!=r&&(u[i]=r.toString())}function bi(n,t,r){t===void 0&&(t=400);r===void 0&&(r=35);s(n);i(t,!1,!0);i(r,!1,!0);var f=Date.now(),u=setInterval(function(){var i=Math.min(1,(Date.now()-f)/t);i=Math.sin(i*Math.PI/2);i*=i;requestAnimationFrame(function(){n(i)});i>=1&&clearInterval(u)},r);return u}function ki(n,t){var u,e,a,i,o,c;t||(t={});var l=t.method?y(t.method).toUpperCase():'GET',p=t.async!=null?g(t.async):!0,r=t.data;if(r!=null&&l=='GET'){u=[];for(e in r)u.push(e+'='+r[e]);u.length&&(a=n.indexOf('?')<0?'?':'&',n+=a+u.join('&'));r=null}if(i=new XMLHttpRequest,i.URL_DEBUG=n,o=!1,r==null||f(r)||(o=v(r),r=JSON.stringify(r)),i.onload=function(){i.readyState==4&&(i.status<300?t.success&&s(t.success)(i):t.error&&s(t.error)(i),t.complete&&s(t.complete)(i))},i.onerror=function(){if(t.error)s(t.error)(i);else throw'HttpRequest Error: '+i.status+' '+i.statusText;},i.open(l,n,p,t.user,t.password),t.user&&t.password&&i.setRequestHeader('Authorization','Basic '+btoa(t.user+':'+t.password)),o&&i.setRequestHeader('Content-Type','application/json'),t.requestHeaders)for(c in t.requestHeaders)i.setRequestHeader(c,t.requestHeaders[c]);return h(t.beforeSend)&&t.beforeSend(i),i.send(r),i}var lt='5.20162.207',vt,r,tt,c,ht,w,ct;n.getVersion=at,function(n){n[n.Back=8]="Back";n[n.Tab=9]="Tab";n[n.Enter=13]="Enter";n[n.Escape=27]="Escape";n[n.Space=32]="Space";n[n.PageUp=33]="PageUp";n[n.PageDown=34]="PageDown";n[n.End=35]="End";n[n.Home=36]="Home";n[n.Left=37]="Left";n[n.Up=38]="Up";n[n.Right=39]="Right";n[n.Down=40]="Down";n[n.Delete=46]="Delete";n[n.F1=112]="F1";n[n.F2=113]="F2";n[n.F3=114]="F3";n[n.F4=115]="F4";n[n.F5=116]="F5";n[n.F6=117]="F6";n[n.F7=118]="F7";n[n.F8=119]="F8";n[n.F9=120]="F9";n[n.F10=121]="F10";n[n.F11=122]="F11";n[n.F12=123]="F12"}(n.Key||(n.Key={}));vt=n.Key,function(n){n[n.Object=0]="Object";n[n.String=1]="String";n[n.Number=2]="Number";n[n.Boolean=3]="Boolean";n[n.Date=4]="Date";n[n.Array=5]="Array"}(n.DataType||(n.DataType={}));r=n.DataType;n.tryCast=a;n.isPrimitive=yt;n.isString=f;n.isNullOrWhiteSpace=pt;n.isNumber=e;n.isInt=b;n.isBoolean=l;n.isFunction=h;n.isUndefined=wt;n.isDate=u;n.isArray=o;n.isObject=v;n.mouseToPage=bt;n.getType=kt;n.changeType=k;n.toFixed=dt;n.format=gt;n.clamp=ni;n.copy=d;n.assert=t;n._deprecated=ti;n.asString=y;n.asNumber=i;n.asInt=ii;n.asBoolean=g;n.asDate=ri;n.asFunction=s;n.asArray=ui;n.asType=nt;n.asEnum=fi;n.asCollectionView=ei;n.hasItems=oi;n.toHeaderCase=si;n.escapeHtml=hi;tt={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'};n.hasClass=p;n.removeClass=it;n.addClass=rt;n.toggleClass=ut;n.setSelectionRange=ci;n.getActiveElement=ft;n.moveFocus=li;n.getElement=ai;n.createElement=vi;n.setText=yi;n.contains=et;n.closest=ot;n.enable=pi;n.getElementRect=wi;n.setCss=st;n.animate=bi;c=function(){function n(n,t){n===void 0&&(n=0);t===void 0&&(t=0);this.x=i(n);this.y=i(t)}return n.prototype.equals=function(t){return t instanceof n&&this.x==t.x&&this.y==t.y},n.prototype.clone=function(){return new n(this.x,this.y)},n}();n.Point=c;ht=function(){function n(n,t){n===void 0&&(n=0);t===void 0&&(t=0);this.width=i(n);this.height=i(t)}return n.prototype.equals=function(t){return t instanceof n&&this.width==t.width&&this.height==t.height},n.prototype.clone=function(){return new n(this.width,this.height)},n}();n.Size=ht;w=function(){function n(n,t,r,u){this.left=i(n);this.top=i(t);this.width=i(r);this.height=i(u)}return Object.defineProperty(n.prototype,"right",{get:function(){return this.left+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bottom",{get:function(){return this.top+this.height},enumerable:!0,configurable:!0}),n.prototype.equals=function(t){return t instanceof n&&this.left==t.left&&this.top==t.top&&this.width==t.width&&this.height==t.height},n.prototype.clone=function(){return new n(this.left,this.top,this.width,this.height)},n.fromBoundingRect=function(i){if(i.left!=null)return new n(i.left,i.top,i.width,i.height);if(i.x!=null)return new n(i.x,i.y,i.width,i.height);t(!1,'Invalid source rectangle.')},n.union=function(t,i){var r=Math.min(t.left,i.left),u=Math.min(t.top,i.top),f=Math.max(t.right,i.right),e=Math.max(t.bottom,i.bottom);return new n(r,u,f-r,e-u)},n.intersection=function(t,i){var r=Math.max(t.left,i.left),u=Math.max(t.top,i.top),f=Math.min(t.right,i.right),e=Math.min(t.bottom,i.bottom);return new n(r,u,f-r,e-u)},n.prototype.contains=function(i){if(i instanceof c)return i.x>=this.left&&i.x<=this.right&&i.y>=this.top&&i.y<=this.bottom;if(i instanceof n){var r=i;return r.left>=this.left&&r.right<=this.right&&r.top>=this.top&&r.bottom<=this.bottom}t(!1,'Point or Rect expected.')},n.prototype.inflate=function(t,i){return new n(this.left-t,this.top-i,this.width+2*t,this.height+2*i)},n}();n.Rect=w;ct=function(){function t(){}return t.addDays=function(n,t){return new Date(n.getFullYear(),n.getMonth(),n.getDate()+t)},t.addMonths=function(n,t){return new Date(n.getFullYear(),n.getMonth()+t,n.getDate())},t.addYears=function(n,t){return new Date(n.getFullYear()+t,n.getMonth(),n.getDate())},t.addHours=function(n,t){return new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours()+t)},t.addMinutes=function(n,t){return new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes()+t)},t.addSeconds=function(n,t){return new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds()+t)},t.sameDate=function(n,t){return u(n)&&u(t)&&n.getFullYear()==t.getFullYear()&&n.getMonth()==t.getMonth()&&n.getDate()==t.getDate()},t.sameTime=function(n,t){return u(n)&&u(t)&&n.getHours()==t.getHours()&&n.getMinutes()==t.getMinutes()&&n.getSeconds()==t.getSeconds()},t.equals=function(n,t){return u(n)&&u(t)&&n.getTime()==t.getTime()},t.fromDateTime=function(n,t){return!n&&!t?null:(n||(n=t),t||(t=n),new Date(n.getFullYear(),n.getMonth(),n.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()))},t.toFiscal=function(i,r){var u=n.culture.Globalize.calendar;return o(u.fiscalYearOffsets)?t.addMonths(i,-u.fiscalYearOffsets[r?0:1]):i},t.fromFiscal=function(i,r){var u=n.culture.Globalize.calendar;return o(u.fiscalYearOffsets)?t.addMonths(i,+u.fiscalYearOffsets[r?0:1]):i},t.newDate=function(){var n=new Date;return new Date(n.getFullYear(),n.getMonth(),n.getDate())},t.clone=function(n){return t.fromDateTime(n,n)},t}();n.DateTime=ct;n.httpRequest=ki})(wijmo||(wijmo={})),function(n){'use strict';n.culture={Globalize:{numberFormat:{'.':'.',',':',',percent:{pattern:['-n %','n %']},currency:{decimals:2,symbol:'$',pattern:['($n)','$n']}},calendar:{'/':'/',':':':',firstDay:0,days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],daysAbbr:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],monthsAbbr:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],am:['AM','A'],pm:['PM','P'],eras:['A.D.','B.C.'],patterns:{d:'M/d/yyyy',D:'dddd, MMMM dd, yyyy',f:'dddd, MMMM dd, yyyy h:mm tt',F:'dddd, MMMM dd, yyyy h:mm:ss tt',t:'h:mm tt',T:'h:mm:ss tt',M:'MMMM d',m:'MMMM d',Y:'MMMM, yyyy',y:'MMMM, yyyy',g:'M/d/yyyy h:mm tt',G:'M/d/yyyy h:mm:ss tt',s:'yyyy"-"MM"-"dd"T"HH":"mm":"ss',o:'yyyy"-"MM"-"dd"T"HH":"mm":"ss"."fffffffK',O:'yyyy"-"MM"-"dd"T"HH":"mm":"ss"."fffffffK',U:'dddd, MMMM dd, yyyy h:mm:ss tt'},fiscalYearOffsets:[-3,-3]}}};var t=function(){function t(){}return t.format=function(i,r,u,f){return n.isString(i)?i:n.isNumber(i)?(r=r||(i==Math.round(i)?'n0':'n2'),t.formatNumber(i,r,u,f)):n.isDate(i)?(r=r||'d',t.formatDate(i,r)):i!=null?i.toString():''},t.formatNumber=function(t,i,r,u){var c,y,l;n.asNumber(t);n.asString(i);var f,o=i?i.match(/([a-z])(\d*)(,*)(.*)/i):null,s=n.culture.Globalize.numberFormat,e=o?o[1].toLowerCase():'n',h=o&&o[2]?parseInt(o[2]):e=='c'?s.currency.decimals:t==Math.round(t)?0:2,p=o&&o[3]?3*o[3].length:0,w=o&&o[4]?o[4]:s.currency.symbol,a=s['.'],v=s[','];if(p&&(t/=Math.pow(10,p)),e=='d'||e=='x'){for(f=Math.round(Math.abs(t)).toString(e=='d'?10:16);f.length<h;)f='0'+f;return t<0&&(f='-'+f),i&&i[0]=='X'&&(f=f.toUpperCase()),f}return e=='p'&&(t=n.toFixed(t*100,h,u)),u&&(t=n.toFixed(t,h,!0)),f=e=='c'||e=='p'?Math.abs(t).toFixed(h):t.toFixed(h),(r||e=='g')&&f.indexOf('.')>-1&&(f=f.replace(/(\.[0-9]*?)0+$/g,'$1'),f=f.replace(/\.$/,'')),a!='.'&&(f=f.replace('.',a)),v&&(e=='n'||e=='c'||e=='p')&&(c=f.indexOf(a),y=/\B(?=(\d\d\d)+(?!\d))/g,f=c>-1?f.substr(0,c).replace(y,v)+f.substr(c):f.replace(y,v)),e=='c'&&(l=s.currency.pattern[t<0?0:1],f=l.replace('n',f).replace('$',w)),e=='p'&&(l=s.percent.pattern[t<0?0:1],f=l.replace('n',f)),f},t.formatDate=function(i,r){var f,e,u;i=n.asDate(i);switch(r){case'r':case'R':return i.toUTCString();case'u':return i.toISOString().replace(/\.\d{3}/,'')}for(r=t._expandFormat(r),f=t._parseDateFormat(r),e='',u=0;u<f.length;u++)e+=t._formatDatePart(i,r,f[u]);return e},t.parseInt=function(n,i){return Math.round(t.parseFloat(n,i))},t.parseFloat=function(t,i){var r=t.indexOf('-')>-1||t.indexOf('(')>-1&&t.indexOf(')')>-1?-1:1,u=t.indexOf('%')>-1?.01:1,f=i?i.match(/,+/):null,e=f?f[0].length*3:0;if(i&&(i[0]=='x'||i[0]=='X'))return t=t.replace(/[^0-9a-f]+.*$/gi,''),parseInt(t,16)*r*u*Math.pow(10,e);var o=n.culture.Globalize.numberFormat['.'],s=new RegExp('[^\\d\\'+o+']','g'),h=t.replace(s,'').replace(o,'.');return parseFloat(h)*r*u*Math.pow(10,e)},t.parseDate=function(i,r){var ut,s,e,p,ht,nt;if(i=n.asString(i),!i)return null;if(r=='u')return new Date(i);if(r=='R'||r=='r')return ut=/(([0-9]+)\-([0-9]+)\-([0-9]+))?\s?(([0-9]+):([0-9]+)(:([0-9]+))?)?/,s=i.match(ut),s[1]||s[5]?(e=s[1]?new Date(parseInt(s[2]),parseInt(s[3])-1,parseInt(s[4])):new Date,s[5]&&(e.setHours(parseInt(s[6])),e.setMinutes(parseInt(s[7])),e.setSeconds(s[8]?parseInt(s[9]):0))):e=new Date(i),isNaN(e.getTime())?null:e;r=t._expandFormat(r?r:'d');var h=n.culture.Globalize.calendar,ft=t._CJK,ct=new RegExp('(\\'+h['/']+')|(\\'+h[':']+")|(\\d+)|(["+ft+"\\.]{2,})|(["+ft+']+)','gi'),c=i.match(ct),w=t._parseDateFormat(r),y=0,l=-1,a=0,d=1,o=0,b=0,k=0,et=0,tt=-1,ot,it,st,g,rt;if(!c||!c.length||!w||!w.length)return null;for(p=0;p<w.length&&c;p++){var v=p-y,u=v>-1&&v<c.length?c[v]:'',f=w[p].length;switch(w[p]){case'EEEE':case'EEE':case'EE':case'E':case'eeee':case'eee':case'ee':case'e':rt=w[p];case'yyyy':case'yyy':case'yy':case'y':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);l=parseInt(u);break;case'MMMM':case'MMM':for(g=!0,ht=u.toLowerCase(),a=-1,nt=0;nt<12;nt++)if(h.months[nt].toLowerCase().indexOf(ht)==0){a=nt;break}if(a>-1)break;case'MM':case'M':g=!0;f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);a=parseInt(u)-1;break;case'dddd':case'ddd':ot=!0;break;case'dd':case'd':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);d=parseInt(u);it=!0;break;case'hh':case'h':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);o=parseInt(u);o=o==12?0:o;break;case'HH':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);o=parseInt(u);break;case'H':o=parseInt(u);break;case'mm':case'm':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);b=parseInt(u);break;case'ss':case's':f>1&&u.length>f&&(c[v]=u.substr(f),u=u.substr(0,f),y++);k=parseInt(u);break;case'fffffff':case'FFFFFFF':case'ffffff':case'FFFFFF':case'fffff':case'FFFFF':case'ffff':case'FFFF':case'fff':case'FFF':case'ff':case'FF':case'f':case'F':et=parseInt(u)/Math.pow(10,f-3);break;case'tt':case't':u=u.toUpperCase();(h.pm[0]&&u==h.pm[0]&&o<12||h.pm[1]&&u==h.pm[1]&&o<12)&&(o+=12);break;case'q':case'Q':case'u':case'U':st=!0;break;case'ggg':case'gg':case'g':tt=h.eras.length>1?t._getEra(u,h):-1;break;case h['/']:case h[':']:if(u&&u!=w[p])return null;break;case'K':break;default:t._unquote(w[p])!=u&&y++}}if(g&&it&&(isNaN(o)&&(o=0),isNaN(b)&&(b=0),isNaN(k)&&(k=0)),a<0||a>11||isNaN(a)||d<0||d>31||isNaN(d)||o<0||o>24||isNaN(o)||b<0||b>60||isNaN(b)||k<0||k>60||isNaN(k))return null;if(rt){if(!g)return null;e=new Date(l,a);e=n.DateTime.fromFiscal(e,rt[0]=='E');l=e.getFullYear();a=e.getMonth()}return ot&&!it?null:st&&!g?null:(l<0&&(l=(new Date).getFullYear()),tt>-1?l=l+h.eras[tt].start.getFullYear()-1:l<100&&(l+=l>=30?1900:2e3),e=new Date(l,a,d,o,b+0,k,et),isNaN(e.getTime())?null:e)},t.getFirstDayOfWeek=function(){var t=n.culture.Globalize.calendar.firstDay;return t?t:0},t.getNumberDecimalSeparator=function(){var t=n.culture.Globalize.numberFormat['.'];return t?t:'.'},t._unquote=function(n){return n.length>1&&n[0]==n[n.length-1]&&(n[0]=='\''||n[0]=='\"')?n.substr(1,n.length-2):n},t._parseDateFormat=function(n){var u,e,i,r,f;if(n in t._dateFomatParts)return t._dateFomatParts[n];for(u=[],e='',i=0;i>-1&&i<n.length;i++){if(f=n[i],(f=='\''||f=='"')&&(r=n.indexOf(f,i+1),r>-1)){u.push(n.substring(i,r+1));i=r;continue}for(r=i+1;r<n.length;r++)if(n[r]!=f)break;u.push(n.substring(i,r));i=r-1}return t._dateFomatParts[n]=u,u},t._formatDatePart=function(i,r,u){var f=n.culture.Globalize.calendar,o=0,h=0,l=0,c,e=u.length,s;switch(u){case'yyyy':case'yyy':case'yy':case'y':case'EEEE':case'EEE':case'EE':case'E':case'eeee':case'eee':case'ee':case'e':return c=u[0]=='E'?n.DateTime.toFiscal(i,!0):u[0]=='e'?n.DateTime.toFiscal(i,!1):i,h=c.getFullYear(),f.eras.length>1&&r.indexOf('g')>-1&&(o=t._getEra(i,f),o>-1&&(h=h-f.eras[o].start.getFullYear()+1)),t._zeroPad(h,4).substr(4-u.length);case'MMMM':return f.months[i.getMonth()];case'MMM':return f.monthsAbbr[i.getMonth()];case'MM':case'M':return t._zeroPad(i.getMonth()+1,e);case'dddd':return f.days[i.getDay()];case'ddd':return f.daysAbbr[i.getDay()];case'dd':return t._zeroPad(i.getDate(),2);case'd':return i.getDate().toString();case'hh':case'h':return t._zeroPad(t._h12(i),e);case'HH':case'H':return t._zeroPad(i.getHours(),e);case'mm':case'm':return t._zeroPad(i.getMinutes(),e);case'ss':case's':return t._zeroPad(i.getSeconds(),e);case'fffffff':case'FFFFFFF':case'ffffff':case'FFFFFF':case'fffff':case'FFFFF':case'ffff':case'FFFF':case'fff':case'FFF':case'ff':case'FF':case'f':case'F':return l=i.getMilliseconds()*Math.pow(10,e-3),u[0]=='f'?t._zeroPad(l,e):l.toFixed(0);case'tt':return i.getHours()<12?f.am[0]:f.pm[0];case't':return i.getHours()<12?f.am[1]:f.pm[1];case'q':case'Q':return(Math.floor(i.getMonth()/3)+1).toString();case'u':case'U':return c=n.DateTime.toFiscal(i,u=='U'),(Math.floor(c.getMonth()/3)+1).toString();case'ggg':case'gg':case'g':return f.eras.length>1&&(o=t._getEra(i,f),o>-1)?u=='ggg'?f.eras[o].name:u=='gg'?f.eras[o].name[0]:f.eras[o].symbol:f.eras[0];case':':case'/':return f[u];case'K':return s=i.toString().match(/(\+|\-)(\d{2})(\d{2})/),s?s[1]+s[2]+s[3]:''}return e>1&&u[0]==u[e-1]&&(u[0]=='\"'||u[0]=='\'')?u.substr(1,e-2):u},t._getEra=function(t,i){var r;if(n.isDate(t)){for(r=0;r<i.eras.length;r++)if(t>=i.eras[r].start)return r}else if(n.isString(t))for(r=0;r<i.eras.length;r++)if(i.eras[r].name&&(i.eras[r].name.indexOf(t)==0||i.eras[r].symbol.indexOf(t)==0))return r;return-1},t._expandFormat=function(t){var i=n.culture.Globalize.calendar.patterns[t];return i?i:t},t._zeroPad=function(n,t){var i=n.toFixed(0),r=t-i.length+1;return r>0?Array(r).join('0')+i:i},t._h12=function(t){var r=n.culture.Globalize.calendar,i=t.getHours();return r.am&&r.am[0]&&(i=i%12,i==0&&(i=12)),i},t._CJK='a-z'+'u00c0-u017fu3000-u30ffu4e00-u9faf'.replace(/u/g,'\\u')+'u1100-u11ffu3130-u318fua960-ua97fuac00-ud7afud7b0-ud7ff'.replace(/u/g,'\\u'),t._dateFomatParts={},t}();n.Globalize=t}(wijmo||(wijmo={})),function(n){'use strict';var t=function(){function n(n){this.path=n}return Object.defineProperty(n.prototype,"path",{get:function(){return this._path},set:function(n){var t,i,r;for(this._path=n,this._parts=n?n.split('.'):[],t=0;t<this._parts.length;t++)i=this._parts[t],r=i.indexOf('['),r>-1&&(this._parts[t]=i.substr(0,r),this._parts.splice(++t,0,parseInt(i.substr(r+1))));this._key=this._parts.length==1?this._parts[0]:null},enumerable:!0,configurable:!0}),n.prototype.getValue=function(n){if(n){if(this._key)return n[this._key];if(this._path in n)return n[this._path];for(var t=0;t<this._parts.length&&n;t++)n=n[this._parts[t]]}return n},n.prototype.setValue=function(n,t){if(n){if(this._path in n){n[this._path]=t;return}for(var i=0;i<this._parts.length-1;i++)if(n=n[this._parts[i]],n==null)return;n[this._parts[this._parts.length-1]]=t}},n}();n.Binding=t}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){'use strict';var f=function(){function n(n,t){this.handler=n;this.self=t}return n}(),e=function(){function i(){this._handlers=[]}return i.prototype.addHandler=function(t,i){n.asFunction(t);this._handlers.push(new f(t,i))},i.prototype.removeHandler=function(t,i){var r,u;for(n.asFunction(t),r=0;r<this._handlers.length;r++)if(u=this._handlers[r],(u.handler==t||t==null)&&(u.self==i||i==null)&&(this._handlers.splice(r,1),t&&i))break},i.prototype.removeAllHandlers=function(){this._handlers.length=0},i.prototype.raise=function(n,i){var r,u;for(i===void 0&&(i=t.empty),r=0;r<this._handlers.length;r++)u=this._handlers[r],u.handler.call(u.self,n,i)},Object.defineProperty(i.prototype,"hasHandlers",{get:function(){return this._handlers.length>0},enumerable:!0,configurable:!0}),i}(),t,i,r,u;n.Event=e;t=function(){function n(){}return n.empty=new n,n}();n.EventArgs=t;i=function(n){function t(){n.apply(this,arguments);this.cancel=!1}return __extends(t,n),t}(t);n.CancelEventArgs=i;r=function(n){function t(t,i,r){n.call(this);this._name=t;this._oldVal=i;this._newVal=r}return __extends(t,n),Object.defineProperty(t.prototype,"propertyName",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"oldValue",{get:function(){return this._oldVal},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"newValue",{get:function(){return this._newVal},enumerable:!0,configurable:!0}),t}(t);n.PropertyChangedEventArgs=r;u=function(n){function t(t){n.call(this);this._xhr=t}return __extends(t,n),Object.defineProperty(t.prototype,"request",{get:function(){return this._xhr},enumerable:!0,configurable:!0}),t}(i);n.RequestErrorEventArgs=u}(wijmo||(wijmo={})),function(n){'use strict';var t=function(){function t(i,r,u){var c=this,f,l,s,v,o;if(r===void 0&&(r=null),u===void 0&&(u=!1),this._focus=!1,this._updating=0,this._fullUpdate=!1,this.gotFocus=new n.Event,this.lostFocus=new n.Event,n.assert(t.getControl(i)==null,'Element is already hosting a control.'),f=n.getElement(i),n.assert(f!=null,'Cannot find the host element.'),this._orgOuter=f.outerHTML,this._orgInner=f.innerHTML,this._orgTag=f.tagName,(f.tagName=='INPUT'||f.tagName=='SELECT')&&(f=this._replaceWithDiv(f)),this._e=f,f[t._DATA_KEY]=this,u==!0&&(this._szCtl=new n.Size(f.offsetWidth,f.offsetHeight),l=this._handleResize.bind(this),this.addEventListener(window,'resize',l)),this.addEventListener(f,'focus',function(){setTimeout(function(){c._updateFocusState()})},!0),this.addEventListener(f,'blur',function(){setTimeout(function(){c._updateFocusState()},20)},!0),s=this._handleDisabled.bind(this),this.addEventListener(f,'mousedown',s,!0),this.addEventListener(f,'mouseup',s,!0),this.addEventListener(f,'click',s,!0),this.addEventListener(f,'dblclick',s,!0),this.addEventListener(f,'keydown',s,!0),this.addEventListener(f,'wheel',s,!0),t._touching==null&&(t._touching=!1,'ontouchstart'in window||'onpointerdown'in window)){var e=document.body,a=this._handleTouchStart,h=this._handleTouchEnd;'ontouchstart'in window?(e.addEventListener('touchstart',a),e.addEventListener('touchend',h),e.addEventListener('touchcancel',h),e.addEventListener('touchleave',h)):'onpointerdown'in window&&(e.addEventListener('pointerdown',a),e.addEventListener('pointerup',h),e.addEventListener('pointerout',h),e.addEventListener('pointercancel',h),e.addEventListener('pointerleave',h))}if(!t._wme||!t._wme.parentElement){v='Wijmo '+n.getVersion()+' eval';t._wme=n.createElement('<div><a href="http://wijmo.com/products/wijmo-5/eval/">'+v+'</a></div>');o={position:'fixed',padding:5,margin:5,background:'#fff',boxShadow:'0 0 10px rgba(0,0,0,0.25)',fontSize:'11pt',zIndex:1e3,opacity:.8,display:'block',visibility:'visible',height:'auto',width:'auto',transform:'none'};switch(Math.round(Math.random()*100)%2){case 0:o.right=o.bottom=0;break;case 1:o.left=o.bottom=0;break;case 2:o.right=o.top=0}n.setCss(t._wme,o);document.body.appendChild(t._wme)}}return t.prototype.getTemplate=function(){for(var t,n=Object.getPrototypeOf(this);n;n=Object.getPrototypeOf(n))if(t=n.constructor.controlTemplate,t)return t;return null},t.prototype.applyTemplate=function(t,i,r,u){var f=this._e,l,o,w,p,s,v,c,h;t&&n.addClass(f,t);l=null;i&&(l=n.createElement(i,f));var b=f.querySelectorAll('input'),e=b.length==1?b[0]:null,a=f.attributes;if(e&&a)for(o=0;o<a.length;o++)a[o].name.match(/name|autofocus|autocomplete|minlength|maxlength|pattern/i)&&e.setAttribute(a[o].name,a[o].value);if(e&&f.id){var k=document.querySelector('label[for="'+f.id+'"]'),d=f.id+'_input',y=d;if(k instanceof HTMLLabelElement){for(o=0;document.getElementById(y)!=null;o++)y=d+o;e.id=y;k.htmlFor=y}}if(e&&(w=document.createEvent('HTMLEvents'),p=e.value,w.initEvent('change',!0,!1),this.addEventListener(e,'input',function(){p=e.value},!0),this.gotFocus.addHandler(function(){p=e.value}),this.lostFocus.addHandler(function(){p!=e.value&&e.dispatchEvent(w)})),f.getAttribute('tabindex')||(f.tabIndex=e!=null?-1:0),this._updateState(),r)for(s in r){if(v=r[s],this[s]=l.querySelector('[wj-part="'+v+'"]'),this[s]==null&&l.getAttribute('wj-part')==v&&(this[s]=l),this[s]==null)throw'Missing template part: "'+v+'"';v==u&&(c='name',h=f.attributes[c],h&&h.value&&this[s].setAttribute(c,h.value),c='accesskey',h=f.attributes[c],h&&h.value&&(this[s].setAttribute(c,h.value),f.removeAttribute(c)))}return l},t.prototype.dispose=function(){for(var e,u,i,r,o=this._e.querySelectorAll('.wj-control'),f=0;f<o.length;f++)e=t.getControl(o[f]),e&&e.dispose();this._toInv&&clearTimeout(this._toInv);this.removeEventListener();for(i in this)i.length>2&&i.indexOf('on')==0&&(r=this[i[2].toLowerCase()+i.substr(3)],r instanceof n.Event&&r.removeAllHandlers());if(u=this.collectionView,u instanceof n.collections.CollectionView)for(i in u)r=u[i],r instanceof n.Event&&r.removeHandler(null,this);this._e.parentNode&&(this._e.outerHTML=this._orgOuter);this._e[t._DATA_KEY]=null;this._e=this._orgOuter=this._orgInner=this._orgTag=null},t.getControl=function(i){var r=n.getElement(i);return r?n.asType(r[t._DATA_KEY],t,!0):null},Object.defineProperty(t.prototype,"hostElement",{get:function(){return this._e},enumerable:!0,configurable:!0}),t.prototype.focus=function(){this._e&&this._e.focus()},t.prototype.containsFocus=function(){var f,i,r,e,u;if(!this._e)return!1;for(f=this._e.querySelectorAll('.wj-control'),i=0;i<f.length;i++)if(r=t.getControl(f[i]),r&&r!=this&&r.containsFocus())return!0;return(e=n.getActiveElement(),u=t.getControl(n.closest(e,'.wj-control.wj-popup')),u&&u.owner&&n.contains(this._e,u.owner))?!0:n.contains(this._e,e)},t.prototype.invalidate=function(n){var i=this;n===void 0&&(n=!0);this._fullUpdate=this._fullUpdate||n;this._toInv&&(clearTimeout(this._toInv),this._toInv=null);this.isUpdating||(this._toInv=setTimeout(function(){i.refresh(i._fullUpdate)},t._REFRESH_INTERVAL))},t.prototype.refresh=function(n){n===void 0&&(n=!0);!this.isUpdating&&this._toInv&&(clearTimeout(this._toInv),this._toInv=null,this._fullUpdate=!1)},t.invalidateAll=function(n){var i,r;if(n||(n=document.body),n.children)for(i=0;i<n.children.length;i++)t.invalidateAll(n.children[i]);r=t.getControl(n);r&&r.invalidate()},t.refreshAll=function(n){var i,r;if(n||(n=document.body),n.children)for(i=0;i<n.children.length;i++)t.refreshAll(n.children[i]);r=t.getControl(n);r&&r.refresh()},t.disposeAll=function(n){var r=t.getControl(n),i;if(r)r.dispose();else if(n.children)for(i=0;i<n.children.length;i++)t.disposeAll(n.children[i])},t.prototype.beginUpdate=function(){this._updating++},t.prototype.endUpdate=function(){this._updating--;this._updating<=0&&this.invalidate()},Object.defineProperty(t.prototype,"isUpdating",{get:function(){return this._updating>0},enumerable:!0,configurable:!0}),t.prototype.deferUpdate=function(n){try{this.beginUpdate();n()}finally{this.endUpdate()}},Object.defineProperty(t.prototype,"isTouching",{get:function(){return t._touching},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDisabled",{get:function(){return this._e&&this._e.getAttribute('disabled')!=null},set:function(t){t=n.asBoolean(t,!0);t!=this.isDisabled&&n.enable(this._e,!t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"disabled",{get:function(){return n._deprecated('disabled','isDisabled'),this.isDisabled},set:function(t){n._deprecated('disabled','isDisabled');this.isDisabled=t},enumerable:!0,configurable:!0}),t.prototype.initialize=function(t){t&&(this.beginUpdate(),n.copy(this,t),this.endUpdate())},t.prototype.addEventListener=function(n,t,i,r){r===void 0&&(r=!1);n&&(n.addEventListener(t,i,r),this._listeners==null&&(this._listeners=[]),this._listeners.push({target:n,type:t,fn:i,capture:r}))},t.prototype.removeEventListener=function(n,t,i){var f=0,u,r;if(this._listeners)for(u=0;u<this._listeners.length;u++)r=this._listeners[u],(n==null||n==r.target)&&(t==null||t==r.type)&&(i==null||i==r.capture)&&(r.target.removeEventListener(r.type,r.fn,r.capture),this._listeners.splice(u,1),u--,f++);return f},t.prototype.onGotFocus=function(n){this.gotFocus.raise(this,n)},t.prototype.onLostFocus=function(n){this.lostFocus.raise(this,n)},t.prototype._handleResize=function(){if(this._e.parentElement){var t=new n.Size(this._e.offsetWidth,this._e.offsetHeight);t.equals(this._szCtl)||(this._szCtl=t,this.invalidate())}},t.prototype._updateFocusState=function(){var n=this;setTimeout(function(){for(var i,u,r=n._e;r;r=r.parentElement)i=t.getControl(r),i&&(u=i.containsFocus(),u!=i._focus&&(i._focus=u,u?i.onGotFocus():i.onLostFocus(),i._updateState()))})},t.prototype._updateState=function(){var t=this.hostElement,i=this.hostElement.querySelector('input'),r;n.toggleClass(t,'wj-state-focused',this.containsFocus());i instanceof HTMLInputElement&&(n.toggleClass(t,'wj-state-empty',i.value.length==0),n.toggleClass(t,'wj-state-readonly',i.readOnly),r=i.validationMessage,n.toggleClass(t,'wj-state-invalid',r&&r.length>0))},t.prototype._handleTouchStart=function(n){(n.pointerType==null||n.pointerType=='touch')&&(t._touching=!0)},t.prototype._handleTouchEnd=function(n){(n.pointerType==null||n.pointerType=='touch')&&setTimeout(function(){t._touching=!1},400)},t.prototype._handleDisabled=function(n){this.isDisabled&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation())},t.prototype._replaceWithDiv=function(n){var r=document.createElement('div'),i,t,u;for(n.parentElement.replaceChild(r,n),r.innerHTML=n.innerHTML,i=n.attributes,t=0;t<i.length;t++)u=i[t].name,i[t].name.match(/id|style|class/i)&&r.setAttribute(u,i[t].value);return r},t._DATA_KEY='wj-Control',t._REFRESH_INTERVAL=10,t}();n.Control=t}(wijmo||(wijmo={})),function(n){'use strict';function i(i,r,u){var v=0,f=0,l=0,s=0,h=null,c=null,y=u?new n.Binding(u):null,a,e,o;if(i=n.asEnum(i,t),i==t.CntAll)return r.length;for(a=0;a<r.length;a++)e=r[a],y&&(e=y.getValue(e)),e!=null&&(v++,(h==null||e<h)&&(h=e),(c==null||e>c)&&(c=e),n.isNumber(e)&&!isNaN(e)?(f++,l+=e,s+=e*e):n.isBoolean(e)&&(f++,e==!0&&(l++,s++)));o=f==0?0:l/f;switch(i){case t.Avg:return o;case t.Cnt:return v;case t.Max:return c;case t.Min:return h;case t.Rng:return c-h;case t.Sum:return l;case t.VarPop:return f<=1?0:s/f-o*o;case t.StdPop:return f<=1?0:Math.sqrt(s/f-o*o);case t.Var:return f<=1?0:(s/f-o*o)*f/(f-1);case t.Std:return f<=1?0:Math.sqrt((s/f-o*o)*f/(f-1))}throw'Invalid aggregate type.';}(function(n){n[n.None=0]="None";n[n.Sum=1]="Sum";n[n.Cnt=2]="Cnt";n[n.Avg=3]="Avg";n[n.Max=4]="Max";n[n.Min=5]="Min";n[n.Rng=6]="Rng";n[n.Std=7]="Std";n[n.Var=8]="Var";n[n.StdPop=9]="StdPop";n[n.VarPop=10]="VarPop";n[n.CntAll=11]="CntAll"})(n.Aggregate||(n.Aggregate={}));var t=n.Aggregate;n.getAggregate=i}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i,u,f,e,r,o;(function(n){n[n.Add=0]="Add";n[n.Remove=1]="Remove";n[n.Change=2]="Change";n[n.Reset=3]="Reset"})(t.NotifyCollectionChangedAction||(t.NotifyCollectionChangedAction={}));i=t.NotifyCollectionChangedAction;u=function(n){function t(t,r,u){t===void 0&&(t=i.Reset);r===void 0&&(r=null);u===void 0&&(u=-1);n.call(this);this.action=t;this.item=r;this.index=u}return __extends(t,n),t.reset=new t(i.Reset),t}(n.EventArgs);t.NotifyCollectionChangedEventArgs=u;f=function(){function t(t,i){this._bnd=new n.Binding(t);this._asc=i}return Object.defineProperty(t.prototype,"property",{get:function(){return this._bnd.path},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ascending",{get:function(){return this._asc},enumerable:!0,configurable:!0}),t}();t.SortDescription=f;e=function(n){function t(t){n.call(this);this.newPageIndex=t}return __extends(t,n),t}(n.CancelEventArgs);t.PageChangingEventArgs=e;r=function(){function n(){}return n.prototype.groupNameFromItem=function(){return''},n.prototype.namesMatch=function(n,t){return n===t},n}();t.GroupDescription=r;o=function(t){function i(i,r){t.call(this);this._bnd=new n.Binding(i);this._converter=r}return __extends(i,t),Object.defineProperty(i.prototype,"propertyName",{get:function(){return this._bnd.path},enumerable:!0,configurable:!0}),i.prototype.groupNameFromItem=function(n){return this._converter?this._converter(n,this.propertyName):this._bnd.getValue(n)},i.prototype.namesMatch=function(n,t){return n===t},i}(r);t.PropertyGroupDescription=o})(t=n.collections||(n.collections={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(){function n(){this.length=0;Array.apply(this,arguments)}return n.prototype.pop=function(){return null},n.prototype.push=function(){for(var t=[],n=0;n<arguments.length;n++)t[+n]=arguments[n];return 0},n.prototype.splice=function(){return null},n.prototype.slice=function(){return null},n.prototype.indexOf=function(){return-1},n.prototype.sort=function(){return null},n}(),r;t.ArrayBase=i;i.prototype=Array.prototype;r=function(i){function r(t){if(i.call(this),this._updating=0,this.collectionChanged=new n.Event,t){t=n.asArray(t);this._updating++;for(var r=0;r<t.length;r++)this.push(t[r]);this._updating--}}return __extends(r,i),r.prototype.push=function(){for(var f,r,n=[],u=0;u<arguments.length;u++)n[+u]=arguments[u];for(f=this.length,r=0;n&&r<n.length;r++)f=i.prototype.push.call(this,n[r]),this._updating||this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Add,n[r],f-1);return f},r.prototype.pop=function(){var n=i.prototype.pop.call(this);return this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Remove,n,this.length),n},r.prototype.splice=function(n,r,u){var f;return r&&u?(f=i.prototype.splice.call(this,n,r,u),r==1?this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Change,u,n):this._raiseCollectionChanged(),f):u?(f=i.prototype.splice.call(this,n,0,u),this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Add,u,n),f):(f=i.prototype.splice.call(this,n,r),r==1?this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Remove,f[0],n):this._raiseCollectionChanged(),f)},r.prototype.slice=function(n,t){return i.prototype.slice.call(this,n,t)},r.prototype.indexOf=function(n,t){return i.prototype.indexOf.call(this,n,t)},r.prototype.sort=function(n){var t=i.prototype.sort.call(this,n);return this._raiseCollectionChanged(),t},r.prototype.insert=function(n,t){this.splice(n,0,t)},r.prototype.remove=function(n){var t=this.indexOf(n);return t>-1?(this.removeAt(t),!0):!1},r.prototype.removeAt=function(n){this.splice(n,1)},r.prototype.setAt=function(n,t){n>this.length&&(this.length=n);this.splice(n,1,t)},r.prototype.clear=function(){this.length!==0&&(this.splice(0,this.length),this._raiseCollectionChanged())},r.prototype.beginUpdate=function(){this._updating++},r.prototype.endUpdate=function(){this._updating>0&&(this._updating--,this._updating==0&&this._raiseCollectionChanged())},Object.defineProperty(r.prototype,"isUpdating",{get:function(){return this._updating>0},enumerable:!0,configurable:!0}),r.prototype.deferUpdate=function(n){try{this.beginUpdate();n()}finally{this.endUpdate()}},r.prototype.implementsInterface=function(n){return n=='INotifyCollectionChanged'},r.prototype.onCollectionChanged=function(n){n===void 0&&(n=t.NotifyCollectionChangedEventArgs.reset);this.isUpdating||this.collectionChanged.raise(this,n)},r.prototype._raiseCollectionChanged=function(n,i,r){if(n===void 0&&(n=t.NotifyCollectionChangedAction.Reset),!this.isUpdating){var u=new t.NotifyCollectionChangedEventArgs(n,i,r);this.onCollectionChanged(u)}},r}(i);t.ObservableArray=r})(t=n.collections||(n.collections={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var r=function(){function r(i,r){var u=this;this._idx=-1;this._srtDsc=new t.ObservableArray;this._grpDesc=new t.ObservableArray;this._newItem=null;this._edtItem=null;this._pgSz=0;this._pgIdx=0;this._updating=0;this._canFilter=!0;this._canGroup=!0;this._canSort=!0;this._canAddNew=!0;this._canCancelEdit=!0;this._canRemove=!0;this._canChangePage=!0;this._trackChanges=!1;this._chgAdded=new t.ObservableArray;this._chgRemoved=new t.ObservableArray;this._chgEdited=new t.ObservableArray;this.collectionChanged=new n.Event;this.sourceCollectionChanging=new n.Event;this.sourceCollectionChanged=new n.Event;this.currentChanged=new n.Event;this.currentChanging=new n.Event;this.pageChanged=new n.Event;this.pageChanging=new n.Event;this._srtDsc.collectionChanged.addHandler(function(){for(var r=u._srtDsc,i=0;i<r.length;i++)n.assert(r[i]instanceof t.SortDescription,'sortDescriptions array must contain SortDescription objects.');u.canSort&&u.refresh()});this._grpDesc.collectionChanged.addHandler(function(){for(var r=u._grpDesc,i=0;i<r.length;i++)n.assert(r[i]instanceof t.GroupDescription,'groupDescriptions array must contain GroupDescription objects.');u.canGroup&&u.refresh()});this.sourceCollection=i?i:new t.ObservableArray;r&&(this.beginUpdate(),n.copy(this,r),this.endUpdate())}return r.prototype._copy=function(i,r){var e,f,u;if(i=='sortDescriptions'){for(this.sortDescriptions.clear(),e=n.asArray(r),f=0;f<e.length;f++)u=e[f],n.isString(u)&&(u=new t.SortDescription(u,!0)),this.sortDescriptions.push(u);return!0}if(i=='groupDescriptions'){for(this.groupDescriptions.clear(),e=n.asArray(r),f=0;f<e.length;f++)u=e[f],n.isString(u)&&(u=new t.PropertyGroupDescription(u)),this.groupDescriptions.push(u);return!0}return!1},Object.defineProperty(r.prototype,"newItemCreator",{get:function(){return this._itemCreator},set:function(t){this._itemCreator=n.asFunction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"sortConverter",{get:function(){return this._srtCvt},set:function(t){t!=this._srtCvt&&(this._srtCvt=n.asFunction(t,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"sortComparer",{get:function(){return this._srtCmp},set:function(t){t!=this._srtCmp&&(this._srtCmp=n.asFunction(t,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"useStableSort",{get:function(){return this._stableSort},set:function(t){this._stableSort=n.asBoolean(t)},enumerable:!0,configurable:!0}),r.prototype.getAggregate=function(t,i,r){var u=r?this._pgView:this._view;return n.getAggregate(t,u,i)},r.prototype.implementsInterface=function(n){switch(n){case'ICollectionView':case'IEditableCollectionView':case'IPagedCollectionView':case'INotifyCollectionChanged':return!0}return!1},Object.defineProperty(r.prototype,"trackChanges",{get:function(){return this._trackChanges},set:function(t){this._trackChanges=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemsAdded",{get:function(){return this._chgAdded},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemsRemoved",{get:function(){return this._chgRemoved},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemsEdited",{get:function(){return this._chgEdited},enumerable:!0,configurable:!0}),r.prototype.clearChanges=function(){this._chgAdded.clear();this._chgRemoved.clear();this._chgEdited.clear()},r.prototype.onCollectionChanged=function(n){n===void 0&&(n=t.NotifyCollectionChangedEventArgs.reset);this._committing||this._canceling||n.action!=t.NotifyCollectionChangedAction.Change||n.item==this.currentEditItem||this._trackItemChanged(n.item);this.collectionChanged.raise(this,n)},r.prototype._raiseCollectionChanged=function(n,i,r){n===void 0&&(n=t.NotifyCollectionChangedAction.Reset);var u=new t.NotifyCollectionChangedEventArgs(n,i,r);this.onCollectionChanged(u)},r.prototype.onSourceCollectionChanging=function(n){return this.sourceCollectionChanging.raise(this,n),!n.cancel},r.prototype.onSourceCollectionChanged=function(n){this.sourceCollectionChanged.raise(this,n)},Object.defineProperty(r.prototype,"canFilter",{get:function(){return this._canFilter},set:function(t){this._canFilter=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canGroup",{get:function(){return this._canGroup},set:function(t){this._canGroup=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canSort",{get:function(){return this._canSort},set:function(t){this._canSort=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"currentItem",{get:function(){return this._pgView&&this._idx>-1&&this._idx<this._pgView.length?this._pgView[this._idx]:null},set:function(n){this.moveCurrentTo(n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"currentPosition",{get:function(){return this._idx},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"filter",{get:function(){return this._filter},set:function(t){this._filter!=t&&(this._filter=n.asFunction(t),this.canFilter&&this.refresh())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"groupDescriptions",{get:function(){return this._grpDesc},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"groups",{get:function(){return this._groups},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isEmpty",{get:function(){return!this._pgView||!this._pgView.length},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"sortDescriptions",{get:function(){return this._srtDsc},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"sourceCollection",{get:function(){return this._src},set:function(t){if(t!=this._src){if(!this.onSourceCollectionChanging(new n.CancelEventArgs))return;var i=this.currentPosition;this.commitEdit();this.commitNew();this._ncc!=null&&this._ncc.collectionChanged.removeHandler(this._sourceChanged);this._src=n.asArray(t,!1);this._ncc=n.tryCast(this._src,'INotifyCollectionChanged');this._ncc&&this._ncc.collectionChanged.addHandler(this._sourceChanged,this);this.clearChanges();this.refresh();this.moveCurrentToFirst();this.onSourceCollectionChanged();this.currentPosition<0&&i>-1&&this.onCurrentChanged()}},enumerable:!0,configurable:!0}),r.prototype._sourceChanged=function(){this._updating<=0&&this.refresh()},r.prototype.contains=function(n){return this._pgView.indexOf(n)>-1},r.prototype.moveCurrentTo=function(n){return this.moveCurrentToPosition(this._pgView.indexOf(n))},r.prototype.moveCurrentToFirst=function(){return this.moveCurrentToPosition(0)},r.prototype.moveCurrentToLast=function(){return this.moveCurrentToPosition(this._pgView.length-1)},r.prototype.moveCurrentToPrevious=function(){return this._idx>0?this.moveCurrentToPosition(this._idx-1):!1},r.prototype.moveCurrentToNext=function(){return this.moveCurrentToPosition(this._idx+1)},r.prototype.moveCurrentToPosition=function(t){if(t>=-1&&t<this._pgView.length){var i=new n.CancelEventArgs;this._idx!=t&&this.onCurrentChanging(i)&&(this._edtItem&&this._pgView[t]!=this._edtItem&&this.commitEdit(),this._newItem&&this._pgView[t]!=this._newItem&&this.commitNew(),this._idx=t,this.onCurrentChanged())}return this._idx==t},r.prototype.refresh=function(){this._updating>0||this._newItem||this._edtItem||(this._performRefresh(),this.onCollectionChanged())},r.prototype._performRefresh=function(){var i=this.currentItem,t;this._view=this._src?this._filter&&this.canFilter?this._performFilter(this._src):this._srtDsc.length>0&&this.canSort?this._src.slice(0):this._src:[];this.canSort&&this._srtDsc.length>0&&this._performSort(this._view);this._groups=this.canGroup?this._createGroups(this._view):null;this._fullGroups=this._groups;this._groups&&(this._view=this._mergeGroupItems(this._groups));this._pgIdx=n.clamp(this._pgIdx,0,this.pageCount-1);this._pgView=this._getPageView();this._groups&&this.pageCount>1&&(this._groups=this._createGroups(this._pgView),this._mergeGroupItems(this._groups));t=this._pgView.indexOf(i);t<0&&(t=Math.min(this._idx,this._pgView.length-1));this._idx=t;this._digest=this._getGroupsDigest(this.groups);this.currentItem!==i&&this.onCurrentChanged()},r.prototype._performSort=function(n){var i,r,t;if(this._stableSort)for(i=n.map(function(n,t){return{item:n,index:t}}),r=this._compareItems(),i.sort(function(n,t){var i=r(n.item,t.item);return i==0?n.index-t.index:i}),t=0;t<n.length;t++)n[t]=i[t].item;else n.sort(this._compareItems())},r.prototype._compareItems=function(){var i=this._srtDsc,t=this._srtCvt,r=this._srtCmp,u=!0,n=0;return function(f,e){for(var l,a,c=0;c<i.length;c++){var h=i[c],o=h._bnd.getValue(f),s=h._bnd.getValue(e);if(t&&(o=t(h,f,o,u),s=t(h,e,s,!1),u=!1),r&&(n=r(o,s),n!=null))return h.ascending?+n:-n;if(o!==o&&(o=null),s!==s&&(s=null),typeof o=='string'&&typeof s=='string'&&(l=o.toLowerCase(),a=s.toLowerCase(),l!=a&&(o=l,s=a)),o!=null&&s==null)return-1;if(o==null&&s!=null)return 1;if(n=o<s?-1:o>s?1:0,n!=0)return h.ascending?+n:-n}return 0}},r.prototype._performFilter=function(n){return this.canFilter&&this._filter?n.filter(this._filter,this):n},r.prototype.onCurrentChanged=function(t){t===void 0&&(t=n.EventArgs.empty);this.currentChanged.raise(this,t)},r.prototype.onCurrentChanging=function(n){return this.currentChanging.raise(this,n),!n.cancel},Object.defineProperty(r.prototype,"items",{get:function(){return this._pgView},enumerable:!0,configurable:!0}),r.prototype.beginUpdate=function(){this._updating++},r.prototype.endUpdate=function(){this._updating--;this._updating<=0&&this.refresh()},Object.defineProperty(r.prototype,"isUpdating",{get:function(){return this._updating>0},enumerable:!0,configurable:!0}),r.prototype.deferUpdate=function(n){try{this.beginUpdate();n()}finally{this.endUpdate()}},Object.defineProperty(r.prototype,"canAddNew",{get:function(){return this._canAddNew},set:function(t){this._canAddNew=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canCancelEdit",{get:function(){return this._canCancelEdit},set:function(t){this._canCancelEdit=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canRemove",{get:function(){return this._canRemove},set:function(t){this._canRemove=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"currentAddItem",{get:function(){return this._newItem},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"currentEditItem",{get:function(){return this._edtItem},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isAddingNew",{get:function(){return this._newItem!=null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isEditingItem",{get:function(){return this._edtItem!=null},enumerable:!0,configurable:!0}),r.prototype.addNew=function(){var i,u,r;if(arguments.length>0&&n.assert(!1,'addNew does not take any parameters, it creates the new items.'),this.commitEdit(),this.commitNew(),!this.canAddNew)return n.assert(!1,'cannot add items (canAddNew == false).'),null;if(i=null,u=this.sourceCollection,i=this.newItemCreator?this.newItemCreator():u&&u.length?new u[0].constructor:{},i!=null){if(this._newItem=i,this._updating++,this._src.push(i),this._updating--,this._pgView!=this._src&&this._pgView.push(i),this.groups&&this.groups.length)for(r=this.groups[this.groups.length-1],r.items.push(i);r.groups&&r.groups.length;)r=r.groups[r.groups.length-1],r.items.push(i);this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Add,i,this._pgView.length-1);this.moveCurrentTo(i)}return this._newItem},r.prototype.cancelEdit=function(){var r=this._edtItem,i;if(r!=null){if(this._edtItem=null,!this.canCancelEdit){n.assert(!1,'cannot cancel edits (canCancelEdit == false).');return}if(i=this._src.indexOf(r),i<0||!this._edtClone)return;this._extend(this._src[i],this._edtClone);this._edtClone=null;this._canceling=!0;this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Change,r,i);this._canceling=!1}},r.prototype.cancelNew=function(){var n=this._newItem;n!=null&&this.remove(n)},r.prototype.commitEdit=function(){var n=this._edtItem,r,i,u;n!=null&&(this._committing=!0,r=this._sameContent(n,this._edtClone),this._edtItem=null,this._edtClone=null,i=this._pgView.indexOf(n),u=this._digest,this._performRefresh(),r||this._trackItemChanged(n),this._pgView.indexOf(n)==i&&u==this._digest?this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Change,n,i):this._raiseCollectionChanged(),this._committing=!1)},r.prototype.commitNew=function(){var n=this._newItem,i,u,r;n!=null&&(this._newItem=null,i=this._pgView.indexOf(n),u=this._digest,this._performRefresh(),this._trackChanges==!0&&(r=this._chgEdited.indexOf(n),r>-1&&this._chgEdited.removeAt(r),this._chgAdded.indexOf(n)<0&&this._chgAdded.push(n)),this._pgView.indexOf(n)==i&&u==this._digest?this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Change,n,i):this._raiseCollectionChanged())},r.prototype.editItem=function(n){n!=this._edtItem&&this.moveCurrentTo(n)&&(this.commitEdit(),this._edtItem=n,this._edtClone={},this._extend(this._edtClone,this._edtItem))},r.prototype.remove=function(i){var e=i==this._newItem,r,o,s,u,f,h,c,l;if(e&&(this._newItem=null),i==this._edtItem&&this.cancelEdit(),!this.canRemove){n.assert(!1,'cannot remove items (canRemove == false).');return}r=this._src.indexOf(i);r>-1&&(o=this.currentItem,this._updating++,this._src.splice(r,1),this._updating--,s=this._digest,this._performRefresh(),this._trackChanges==!0&&(u=this._chgAdded.indexOf(i),u>-1&&this._chgAdded.removeAt(u),f=this._chgEdited.indexOf(i),f>-1&&this._chgEdited.removeAt(f),h=this._chgRemoved.indexOf(i),h<0&&!e&&u<0&&this._chgRemoved.push(i)),c=this.sortDescriptions.length>0,l=this.pageSize>0&&this._pgIdx>-1,c||l||s!=this._getGroupsDigest(this.groups)?this._raiseCollectionChanged():this._raiseCollectionChanged(t.NotifyCollectionChangedAction.Remove,i,r),this.currentItem!==o&&this.onCurrentChanged())},r.prototype.removeAt=function(t){t=n.asInt(t);this.remove(this._pgView[t])},r.prototype._trackItemChanged=function(n){var i,r;if(this._trackChanges)if(i=this._chgEdited.indexOf(n),i<0&&this._chgAdded.indexOf(n)<0)this._chgEdited.push(n);else if(i>-1){r=new t.NotifyCollectionChangedEventArgs(t.NotifyCollectionChangedAction.Change,n,i);this._chgEdited.onCollectionChanged(r)}else if(i=this._chgAdded.indexOf(n),i>-1){r=new t.NotifyCollectionChangedEventArgs(t.NotifyCollectionChangedAction.Change,n,i);this._chgAdded.onCollectionChanged(r)}},r.prototype._extend=function(n,t){for(var i in t)n[i]=t[i]},r.prototype._sameContent=function(n,t){for(var i in t)if(!this._sameValue(n[i],t[i]))return!1;for(i in n)if(!this._sameValue(n[i],t[i]))return!1;return!0},r.prototype._sameValue=function(t,i){return t==i||n.DateTime.equals(t,i)},Object.defineProperty(r.prototype,"canChangePage",{get:function(){return this._canChangePage},set:function(t){this._canChangePage=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isPageChanging",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemCount",{get:function(){return this._pgView.length},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"pageIndex",{get:function(){return this._pgIdx},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"pageSize",{get:function(){return this._pgSz},set:function(t){t!=this._pgSz&&(this._pgSz=n.asInt(t),this.refresh())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"totalItemCount",{get:function(){return this._view.length},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"pageCount",{get:function(){return this.pageSize?Math.ceil(this.totalItemCount/this.pageSize):1},enumerable:!0,configurable:!0}),r.prototype.moveToFirstPage=function(){return this.moveToPage(0)},r.prototype.moveToLastPage=function(){return this.moveToPage(this.pageCount-1)},r.prototype.moveToNextPage=function(){return this.moveToPage(this.pageIndex+1)},r.prototype.moveToPage=function(i){var r=n.clamp(i,0,this.pageCount-1),u;return r!=this._pgIdx&&(this.canChangePage||n.assert(!1,'cannot change pages (canChangePage == false).'),u=new t.PageChangingEventArgs(r),this.onPageChanging(u)&&(this._pgIdx=r,this._pgView=this._getPageView(),this._idx=0,this.groupDescriptions&&this.groupDescriptions.length!=0?this.refresh():(this.onPageChanged(),this.onCollectionChanged()))),this._pgIdx==i},r.prototype.moveToPreviousPage=function(){return this.moveToPage(this.pageIndex-1)},r.prototype.onPageChanged=function(t){t===void 0&&(t=n.EventArgs.empty);this.pageChanged.raise(this,t)},r.prototype.onPageChanging=function(n){return this.pageChanging.raise(this,n),!n.cancel},r.prototype._getFullGroup=function(n){var t=this._getGroupByPath(this._fullGroups,n.level,n._path);return t!=null&&(n=t),n},r.prototype._getGroupByPath=function(n,t,i){for(var r,u=0;u<n.length;u++)if((r=n[u],r.level==t&&r._path==i)||r.level<t&&i.indexOf(r._path)==0&&(r=this._getGroupByPath(r.groups,t,i),r!=null))return r;return null},r.prototype._getPageView=function(){if(this.pageSize<=0||this._pgIdx<0)return this._view;var n=this._pgSz*this._pgIdx,t=Math.min(n+this._pgSz,this._view.length);return this._view.slice(n,t)},r.prototype._createGroups=function(t){var u,i,e;if(!this._grpDesc||!this._grpDesc.length)return null;var s=[],h={},r=null;for(u=0;u<t.length;u++){var c=t[u],l=s,a=this._grpDesc.length,f='';for(i=0;i<a;i++){var v=this._grpDesc[i],o=v.groupNameFromItem(c,i),y=i==a-1;r=h[f];!r&&n.isPrimitive(o)&&(r={},h[f]=r);e=this._getGroup(v,l,r,o,i,y);f+='/'+o;e._path=f;y&&e.items.push(c);l=e.groups}}return s},r.prototype._getGroupsDigest=function(n){for(var t,i='',r=0;n!=null&&r<n.length;r++)t=n[r],i+='{'+t.name+':'+(t.items?t.items.length:'*'),t.groups.length>0&&(i+=',',i+=this._getGroupsDigest(t.groups)),i+='}';return i},r.prototype._mergeGroupItems=function(n){for(var i,f,t,r,e=[],u=0;u<n.length;u++){if(i=n[u],!i._isBottomLevel)for(f=this._mergeGroupItems(i.groups),t=0,r=f.length;t<r;t++)i._items.push(f[t]);for(t=0,r=i._items.length;t<r;t++)e.push(i._items[t])}return e},r.prototype._getGroup=function(t,r,u,f,e,o){var c,s,h;if(u&&n.isPrimitive(f)){if(c=u[f],c)return c}else for(s=0;s<r.length;s++)if(t.namesMatch(r[s].name,f))return r[s];return h=new i(t,f,e,o),r.push(h),u&&(u[f]=h),h},r}(),i;t.CollectionView=r;i=function(){function t(n,t,i,r){this._gd=n;this._name=t;this._level=i;this._isBottomLevel=r;this._groups=[];this._items=[]}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"level",{get:function(){return this._level},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isBottomLevel",{get:function(){return this._isBottomLevel},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"groups",{get:function(){return this._groups},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"groupDescription",{get:function(){return this._gd},enumerable:!0,configurable:!0}),t.prototype.getAggregate=function(t,i,u){var f=n.tryCast(u,r),e=f?f._getFullGroup(this):this;return n.getAggregate(t,e.items,i)},t}();t.CollectionViewGroup=i})(t=n.collections||(n.collections={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){'use strict';var i=function(){function i(t){this._showAutoTipBnd=this._showAutoTip.bind(this);this._hideAutoTipBnd=this._hideAutoTip.bind(this);this._html=!0;this._gap=6;this._showAtMouse=!1;this._showDelay=500;this._hideDelay=0;this._tips=[];this.popup=new n.Event;n.copy(this,t)}return i.prototype.setTooltip=function(t,i){t=n.getElement(t);i=this._getContent(i);var r=this._indexOf(t);r>-1&&(this._detach(t),this._tips.splice(r,1));i&&(this._attach(t),this._tips.push({element:t,content:i}))},i.prototype.show=function(r,u,f){var e,o;r=n.getElement(r);u=this._getContent(u);f||(f=n.Rect.fromBoundingRect(r.getBoundingClientRect()));e=i._eTip;e||(e=i._eTip=document.createElement('div'),n.addClass(e,'wj-tooltip'),e.style.visibility='none',document.body.appendChild(e));this._setContent(u);o=new t(u);this.onPopup(o);o.content&&!o.cancel&&(this._setContent(o.content),e.style.minWidth='',f=new n.Rect(f.left-(e.offsetWidth-f.width)/2,f.top-this.gap,e.offsetWidth,f.height+2*this.gap),n.showPopup(e,f,!0),document.addEventListener('mousedown',this._hideAutoTipBnd))},i.prototype.hide=function(){i._eTip&&(i._eTip.style.visibility='hidden',i._eTip.innerHTML='');document.removeEventListener('mousedown',this._hideAutoTipBnd)},Object.defineProperty(i.prototype,"isVisible",{get:function(){return i._eTip&&i._eTip.style.visibility!='hidden'},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isContentHtml",{get:function(){return this._html},set:function(t){this._html=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"gap",{get:function(){return this._gap},set:function(t){this._gap=n.asNumber(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"showAtMouse",{get:function(){return this._showAtMouse},set:function(t){this._showAtMouse=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"showDelay",{get:function(){return this._showDelay},set:function(t){this._showDelay=n.asInt(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"hideDelay",{get:function(){return this._hideDelay},set:function(t){this._hideDelay=n.asInt(t)},enumerable:!0,configurable:!0}),i.prototype.onPopup=function(n){this.popup&&this.popup.raise(this,n)},i.prototype._indexOf=function(n){for(var t=0;t<this._tips.length;t++)if(this._tips[t].element==n)return t;return-1},i.prototype._attach=function(n){n.addEventListener('mouseenter',this._showAutoTipBnd);n.addEventListener('mouseleave',this._hideAutoTipBnd);n.addEventListener('click',this._showAutoTipBnd)},i.prototype._detach=function(n){n.removeEventListener('mouseenter',this._showAutoTipBnd);n.removeEventListener('mouseleave',this._hideAutoTipBnd);n.removeEventListener('click',this._showAutoTipBnd)},i.prototype._showAutoTip=function(t){var i=this,r=t.type=='mouseenter'?this._showDelay:0;this._clearTimeouts();this._toShow=setTimeout(function(){var u=i._indexOf(t.target),r,f;u>-1&&(r=i._tips[u],f=i._showAtMouse?new n.Rect(t.clientX,t.clientY,0,0):null,i.show(r.element,r.content,f),i._hideDelay>0&&(i._toHide=setTimeout(function(){i.hide()},i._hideDelay)))},r)},i.prototype._hideAutoTip=function(){this._clearTimeouts();this.hide()},i.prototype._clearTimeouts=function(){this._toShow&&(clearTimeout(this._toShow),this._toShow=null);this._toHide&&(clearTimeout(this._toHide),this._toHide=null)},i.prototype._getContent=function(t){if(t=n.asString(t),t&&t[0]=='#'){var i=n.getElement(t);i&&(t=i.innerHTML)}return t},i.prototype._setContent=function(n){var t=i._eTip;t&&(this.isContentHtml?t.innerHTML=n:t.textContent=n)},i}(),r,t;n.Tooltip=i;r=function(){function n(){}return n}();t=function(t){function i(i){t.call(this);this._content=n.asString(i)}return __extends(i,t),Object.defineProperty(i.prototype,"content",{get:function(){return this._content},set:function(t){this._content=n.asString(t)},enumerable:!0,configurable:!0}),i}(n.CancelEventArgs);n.TooltipEventArgs=t}(wijmo||(wijmo={})),function(n){'use strict';var t=function(){function t(n){this._r=0;this._g=0;this._b=0;this._a=1;n&&this._parse(n)}return Object.defineProperty(t.prototype,"r",{get:function(){return this._r},set:function(t){this._r=n.clamp(n.asNumber(t),0,255)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"g",{get:function(){return this._g},set:function(t){this._g=n.clamp(n.asNumber(t),0,255)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._b},set:function(t){this._b=n.clamp(n.asNumber(t),0,255)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"a",{get:function(){return this._a},set:function(t){this._a=n.clamp(n.asNumber(t),0,1)},enumerable:!0,configurable:!0}),t.prototype.equals=function(n){return n instanceof t&&this.r==n.r&&this.g==n.g&&this.b==n.b&&this.a==n.a},t.prototype.toString=function(){var n=Math.round(this.a*100);return n>99?'#'+(16777216+(this.r<<16)+(this.g<<8)+this.b).toString(16).slice(1):'rgba('+this.r+','+this.g+','+this.b+','+n/100+')'},t.fromRgba=function(i,r,u,f){f===void 0&&(f=1);var e=new t(null);return e.r=Math.round(n.clamp(n.asNumber(i),0,255)),e.g=Math.round(n.clamp(n.asNumber(r),0,255)),e.b=Math.round(n.clamp(n.asNumber(u),0,255)),e.a=n.clamp(n.asNumber(f),0,1),e},t.fromHsb=function(i,r,u,f){f===void 0&&(f=1);var e=t._hsbToRgb(n.clamp(n.asNumber(i),0,1),n.clamp(n.asNumber(r),0,1),n.clamp(n.asNumber(u),0,1));return t.fromRgba(e[0],e[1],e[2],f)},t.fromHsl=function(i,r,u,f){f===void 0&&(f=1);var e=t._hslToRgb(n.clamp(n.asNumber(i),0,1),n.clamp(n.asNumber(r),0,1),n.clamp(n.asNumber(u),0,1));return t.fromRgba(e[0],e[1],e[2],f)},t.fromString=function(i){var r=new t(null);return r._parse(n.asString(i))?r:null},t.prototype.getHsb=function(){return t._rgbToHsb(this.r,this.g,this.b)},t.prototype.getHsl=function(){return t._rgbToHsl(this.r,this.g,this.b)},t.interpolate=function(i,r,u){u=n.clamp(n.asNumber(u),0,1);var e=t._rgbToHsl(i.r,i.g,i.b),o=t._rgbToHsl(r.r,r.g,r.b),f=1-u,c=i.a*f+r.a*u,s=[e[0]*f+o[0]*u,e[1]*f+o[1]*u,e[2]*f+o[2]*u],h=t._hslToRgb(s[0],s[1],s[2]);return t.fromRgba(h[0],h[1],h[2],c)},t.toOpaque=function(i,r){if(i=n.isString(i)?t.fromString(i):n.asType(i,t),i.a==1)return i;r=r==null?t.fromRgba(255,255,255,1):n.isString(r)?t.fromString(r):n.asType(r,t);var u=i.a,f=1-u;return t.fromRgba(i.r*u+r.r*f,i.g*u+r.g*f,i.b*u+r.b*f)},t.prototype._parse=function(n){var u,f,r,e,i,o;if(n=n.toLowerCase(),n=='transparent')return this._r=this._g=this._b=this._a=0,!0;if(n&&n.indexOf('#')!=0&&n.indexOf('rgb')!=0&&n.indexOf('hsl')!=0&&(u=document.createElement('div'),u.style.color=n,f=u.style.color,f==n&&(f=window.getComputedStyle(u).color,f||(document.body.appendChild(u),f=window.getComputedStyle(u).color,document.body.removeChild(u))),n=f.toLowerCase()),n.indexOf('#')==0)return n.length==4?(this.r=parseInt(n[1]+n[1],16),this.g=parseInt(n[2]+n[2],16),this.b=parseInt(n[3]+n[3],16),this.a=1,!0):n.length==7?(this.r=parseInt(n.substr(1,2),16),this.g=parseInt(n.substr(3,2),16),this.b=parseInt(n.substr(5,2),16),this.a=1,!0):!1;if(n.indexOf('rgb')==0&&(r=n.indexOf('('),e=n.indexOf(')'),r>-1&&e>-1&&(i=n.substr(r+1,e-(r+1)).split(','),i.length>2)))return this.r=parseInt(i[0]),this.g=parseInt(i[1]),this.b=parseInt(i[2]),this.a=i.length>3?parseFloat(i[3]):1,!0;if(n.indexOf('hsl')==0&&(r=n.indexOf('('),e=n.indexOf(')'),r>-1&&e>-1&&(i=n.substr(r+1,e-(r+1)).split(','),i.length>2))){var c=parseInt(i[0])/360,s=parseInt(i[1]),h=parseInt(i[2]);return i[1].indexOf('%')>-1&&(s/=100),i[2].indexOf('%')>-1&&(h/=100),o=t._hslToRgb(c,s,h),this.r=o[0],this.g=o[1],this.b=o[2],this.a=i.length>3?parseFloat(i[3]):1,!0}return!1},t._hslToRgb=function(i,r,u){var o,s,h,f,e;return n.assert(i>=0&&i<=1&&r>=0&&r<=1&&u>=0&&u<=1,'bad HSL values'),r==0?o=s=h=u:(f=u<.5?u*(1+r):u+r-u*r,e=2*u-f,o=t._hue2rgb(e,f,i+1/3),s=t._hue2rgb(e,f,i),h=t._hue2rgb(e,f,i-1/3)),[Math.round(o*255),Math.round(s*255),Math.round(h*255)]},t._hue2rgb=function(n,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?n+(t-n)*6*i:i<1/2?t:i<2/3?n+(t-n)*(2/3-i)*6:n},t._rgbToHsl=function(t,i,r){var e;n.assert(t>=0&&t<=255&&i>=0&&i<=255&&r>=0&&r<=255,'bad RGB values');t/=255;i/=255;r/=255;var u=Math.max(t,i,r),o=Math.min(t,i,r),f,s,h=(u+o)/2;if(u==o)f=s=0;else{e=u-o;s=h>.5?e/(2-u-o):e/(u+o);switch(u){case t:f=(i-r)/e+(i<r?6:0);break;case i:f=(r-t)/e+2;break;case r:f=(t-i)/e+4}f/=6}return[f,s,h]},t._rgbToHsb=function(i,r,u){n.assert(i>=0&&i<=255&&r>=0&&r<=255&&u>=0&&u<=255,'bad RGB values');var f=t._rgbToHsl(i,r,u);return t._hslToHsb(f[0],f[1],f[2])},t._hsbToRgb=function(n,i,r){var u=t._hsbToHsl(n,i,r);return t._hslToRgb(u[0],u[1],u[2])},t._hsbToHsl=function(t,i,r){n.assert(t>=0&&t<=1&&i>=0&&i<=1&&r>=0&&r<=1,'bad HSB values');var u=n.clamp(r*(2-i)/2,0,1),f=1-Math.abs(2*u-1),e=n.clamp(f>0?r*i/f:i,0,1);return n.assert(!isNaN(u)&&!isNaN(e),'bad conversion to HSL'),[t,e,u]},t._hslToHsb=function(t,i,r){n.assert(t>=0&&t<=1&&i>=0&&i<=1&&r>=0&&r<=1,'bad HSL values');var u=n.clamp(r==1?1:(2*r+i*(1-Math.abs(2*r-1)))/2,0,1),f=n.clamp(u>0?2*(u-r)/u:i,0,1);return n.assert(!isNaN(u)&&!isNaN(f),'bad conversion to HSB'),[t,f,u]},t}();n.Color=t}(wijmo||(wijmo={})),function(n){'use strict';var t=function(){function t(){}return t.copy=function(n){t._copyPasteInternal(n)},t.paste=function(n){t._copyPasteInternal(n)},t._copyPasteInternal=function(t){for(var u=n.getActiveElement(),r=n.closest(u,'.wj-control'),i;r&&n.Control.getControl(r);)r=r.parentElement;r==null&&(r=document.body);r&&(i=document.createElement('textarea'),i.style.position='fixed',i.style.opacity='0',r.appendChild(i),typeof t=='string'&&(i.value=t),i.select(),i.onkeydown=function(n){i.value&&n.preventDefault()},setTimeout(function(){var n=i.value;r.removeChild(i);u.focus();typeof t=='function'&&t(n)},100))},t}();n.Clipboard=t}(wijmo||(wijmo={})),function(n){'use strict';function i(i,r,u,f,e){var h,o,a,tt,w,p,g,it,nt,b,l;if(r===void 0&&(r=null),u===void 0&&(u=!1),f===void 0&&(f=!1),e===void 0&&(e=!0),h=document.body,r instanceof HTMLElement){if(!n.contains(document.body,r))return;for(o=r.parentElement;o;o=o.parentElement)if(getComputedStyle(o).position=='fixed'){h=o;break}}else for(o=n.getActiveElement();o;o=o.parentElement)if(!n.hasClass(o,'wj-popup')&&getComputedStyle(o).position=='fixed'){h=o;break}h.lastChild!=i&&h.appendChild(i);r instanceof HTMLElement&&e&&(a=getComputedStyle(r),tt=new n.Color(a.backgroundColor),tt.a&&n.setCss(i,{color:a.color,backgroundColor:a.backgroundColor,fontFamily:a.fontFamily,fontSize:a.fontSize,fontWeight:a.fontWeight,fontStyle:a.fontStyle}));n.setCss(i,{position:'absolute',visibility:'hidden',display:''});n.Control.refreshAll(i);var y=getComputedStyle(i),rt=parseFloat(y.marginTop)+parseFloat(y.marginBottom),ut=parseFloat(y.marginLeft)+parseFloat(y.marginRight),v=new n.Size(i.offsetWidth+ut,i.offsetHeight+rt),c=new n.Point,s=null;if(r&&r.clientX!=null&&r.clientY!=null&&r.pageX!=null&&r.pageY!=null)r.clientX<=0&&r.clientY<=0&&r.target?s=r.target.getBoundingClientRect():(c.x=Math.max(0,r.pageX-pageXOffset),c.y=Math.max(0,r.pageY-pageYOffset));else if(r instanceof n.Point)c=r;else if(r instanceof HTMLElement)s=r.getBoundingClientRect();else if(r&&r.top!=null&&r.left!=null)s=r;else if(r==null)c.x=Math.max(0,(innerWidth-v.width)/2),c.y=Math.max(0,Math.round((innerHeight-v.height)/2*.7));else throw'Invalid ref parameter.';if(w=parseFloat(y.minWidth),s){var k=s.top,d=innerHeight-s.bottom,ft=getComputedStyle(i).direction=='rtl';c.x=ft?Math.max(0,s.right-v.width):Math.max(0,Math.min(s.left,innerWidth-v.width));c.y=u?k>v.height||k>d?Math.max(0,s.top-v.height):s.bottom:d>v.height||d>k?s.bottom:Math.max(0,s.top-v.height);w=Math.max(w,s.width)}if(p=new n.Point(0,0),r!=null&&(h==document.body?p=new n.Point(-pageXOffset,-pageYOffset):h&&(g=h.getBoundingClientRect(),p=new n.Point(g.left-h.scrollLeft,g.top-h.scrollTop))),it={position:r==null?'fixed':'absolute',left:c.x-p.x,top:c.y-p.y,minWidth:w,display:'',visibility:'',zIndex:1500},f&&(i.style.opacity='0',n.animate(function(n){i.style.opacity=n==1?'':n.toString()})),n.setCss(i,it),nt=r instanceof MouseEvent?r.target:r,nt instanceof HTMLElement)for(l=nt.parentElement;l&&l!=document.body;l=l.parentElement)getComputedStyle(l).overflowY=='auto'&&l.scrollHeight>l.offsetHeight&&(b||(b=new n.Control(document.createElement('div'))),b.addEventListener(l,'scroll',function(){t(i,!0);b.dispose()}))}function r(i,r,u){r===void 0&&(r=!0);u===void 0&&(u=!1);u?n.animate(function(n){i.style.opacity=(1-n).toString();n==1&&(t(i,r),i.style.opacity='')}):t(i,r)}function t(n,t){n.style.display='none';t&&n.parentElement&&n.parentElement.removeChild(n)}n.showPopup=i;n.hidePopup=r}(wijmo||(wijmo={})),function(n){'use strict';var t=function(){function t(t){this._copyCss=!0;t!=null&&n.copy(this,t)}return Object.defineProperty(t.prototype,"title",{get:function(){return this._title},set:function(t){this._title=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"copyCss",{get:function(){return this._copyCss},set:function(t){this._copyCss=n.asBoolean(t)},enumerable:!0,configurable:!0}),t.prototype.addCSS=function(n){this._css||(this._css=[]);this._css.push(n)},t.prototype.append=function(t){var i=this._getDocument();n.isString(t)?i.write(t):t instanceof HTMLElement?i.write(t.outerHTML):n.assert(!1,'child should be an HTML element or a string.')},t.prototype.print=function(){var n=this;this._iframe&&(this._close(),setTimeout(function(){var t=n._iframe.contentWindow;t.focus();t.print();document.body.removeChild(n._iframe);n._iframe=null},100))},t.prototype._getDocument=function(){if(!this._iframe){this._iframe=document.createElement('iframe');var n=this._iframe.style;n.position='fixed';n.left='10000px';n.top='10000px';document.body.appendChild(this._iframe)}return this._iframe.contentDocument},t.prototype._close=function(){var i=this._getDocument(),r,e,u,o,t,s,f;if(i.close(),this.title&&(r=i.querySelector('title'),r||(r=i.createElement('title'),i.head.appendChild(r)),r.textContent=this.title),this._copyCss){for(e=document.head.querySelectorAll('LINK'),t=0;t<e.length;t++)u=e[t],u.href.match(/\.css$/i)&&u.rel.match(/stylesheet/i)&&(f=n.httpRequest(u.href,{async:!1}),this._addStyle(f.responseText));for(o=document.head.querySelectorAll('STYLE'),t=0;t<o.length;t++)this._addStyle(o[t].textContent)}if(this._css)for(t=0;t<this._css.length;t++)s=i.createElement('style'),f=n.httpRequest(this._css[t],{async:!1}),s.textContent=f.responseText,i.head.appendChild(s)},t.prototype._addStyle=function(n){var t=this._getDocument(),i=t.createElement('style');i.textContent=n;t.head.appendChild(i)},t}();n.PrintDocument=t}(wijmo||(wijmo={})),function(n){'use strict';var i=function(){function i(n,t,i){t===void 0&&(t=null);i===void 0&&(i='_');this._promptChar='_';this._mskArr=[];this._full=!0;this._hbInput=this._input.bind(this);this._hbKeyDown=this._keydown.bind(this);this._hbKeyPress=this._keypress.bind(this);this._hbCompositionStart=this._compositionstart.bind(this);this._hbCompositionEnd=this._compositionend.bind(this);this.mask=t;this.input=n;this.promptChar=i;this._connect(!0)}return Object.defineProperty(i.prototype,"input",{get:function(){return this._tbx},set:function(n){this._connect(!1);this._tbx=n;this._connect(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"mask",{get:function(){return this._msk},set:function(t){t!=this._msk&&(this._msk=n.asString(t,!0),this._parseMask(),this._valueChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"promptChar",{get:function(){return this._promptChar},set:function(t){t!=this._promptChar&&(this._promptChar=n.asString(t,!1),n.assert(this._promptChar.length==1,'promptChar must be a string with length 1.'),this._valueChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"maskFull",{get:function(){return this._full},enumerable:!0,configurable:!0}),i.prototype.getMaskRange=function(){return this._mskArr.length?[this._firstPos,this._lastPos]:[0,this._tbx.value.length-1]},i.prototype.getRawValue=function(){var t=this._tbx.value,i='',n;if(!this.mask)return t;for(n=0;n<this._mskArr.length&&n<t.length;n++)this._mskArr[n].literal||t[n]==this._promptChar||(i+=t[n]);return i},i.prototype.refresh=function(){this._parseMask();this._valueChanged()},i.prototype._input=function(){var n=this;this._composing||setTimeout(function(){n._valueChanged()})},i.prototype._keydown=function(t){if(t.keyCode==n.Key.Back){var i=this._tbx.selectionStart,r=this._tbx.selectionEnd;if(i<=this._firstPos&&r==i){t.preventDefault();this._backSpace=!1;return}}this._backSpace=t.keyCode==n.Key.Back},i.prototype._keypress=function(n){n.ctrlKey||n.metaKey||n.altKey||this._composing||!this._preventKey(n.charCode)||n.preventDefault()},i.prototype._compositionstart=function(){this._composing=!0},i.prototype._compositionend=function(){var n=this;this._composing=!1;setTimeout(function(){n._valueChanged()})},i.prototype._preventKey=function(t){var r;if(t&&this._mskArr.length){var u=this._tbx,i=u.selectionStart,f=String.fromCharCode(t);if(i<this._firstPos&&(i=this._firstPos,n.setSelectionRange(u,i)),i>=this._mskArr.length)return!0;if(r=this._mskArr[i],r.literal)this._validatePosition(i);else if(r.wildCard!=f&&!this._isCharValid(r.wildCard,f))return!0}return!1},i.prototype._connect=function(n){var t=this._tbx;t&&(n?(this._autoComplete=t.autocomplete,this._spellCheck=t.spellcheck,t.autocomplete='off',t.spellcheck=!1,t.addEventListener('input',this._hbInput),t.addEventListener('keydown',this._hbKeyDown,!0),t.addEventListener('keypress',this._hbKeyPress,!0),t.addEventListener('compositionstart',this._hbCompositionStart,!0),t.addEventListener('compositionend',this._hbCompositionEnd,!0),this._valueChanged()):(t.autocomplete=this._autoComplete,t.spellcheck=this._spellCheck,t.removeEventListener('input',this._hbInput),t.removeEventListener('keydown',this._hbKeyDown,!0),t.removeEventListener('keypress',this._hbKeyPress,!0),t.removeEventListener('compositionstart',this._hbCompositionStart,!0),t.removeEventListener('compositionend',this._hbCompositionEnd,!0)))},i.prototype._valueChanged=function(){var i;if(this._tbx&&this._msk){var t=this._tbx,n=t.selectionStart,r=n>0?t.value[n-1]:'';t.value=this._applyMask();i=n>0?t.value[n-1]:'';n>0&&i==this._promptChar&&r!=this.promptChar&&n--;this._validatePosition(n)}},i.prototype._applyMask=function(){var t,e,r,f,u,n,i;if((this._full=!0,t=this._tbx.value,!this._msk)||!t&&!this._tbx.required)return t;for(e='',r=0,t=this._handleVagueLiterals(t),f=0;f<this._mskArr.length;f++){if(u=this._mskArr[f],n=u.literal,n&&n==t[r]&&r++,u.wildCard){if(n=this._promptChar,t){for(i=r;i<t.length;i++)if(this._isCharValid(u.wildCard,t[i])){n=t[i];switch(u.charCase){case'>':n=n.toUpperCase();break;case'<':n=n.toLowerCase()}break}r=i+1}n==this._promptChar&&(this._full=!1)}e+=n}return e},i.prototype._handleVagueLiterals=function(n){var i,t,f,r,e,u;if(n.length>this._mskArr.length+1)return n;if(i=n.length-this._mskArr.length,i!=0&&n.length>1){for(t=-1,f=Math.max(0,this._tbx.selectionStart-i),r=f;r<this._mskArr.length;r++)if(this._mskArr[r].vague){t=r;break}if(t>-1)if(i<0)e=Array(1-i).join(this._promptChar),u=t+i,u>-1&&(n=n.substr(0,u)+e+n.substr(u));else{while(t>0&&this._mskArr[t-1].literal)t--;n=n.substr(0,t)+n.substr(t+i)}}return n},i.prototype._isCharValid=function(n,t){var r=this._promptChar;switch(n){case'0':return t>='0'&&t<='9'||t==r;case'9':return t>='0'&&t<='9'||t==' '||t==r;case'#':return t>='0'&&t<='9'||t==' '||t=='+'||t=='-'||t==r;case'L':return t>='a'&&t<='z'||t>='A'&&t<='Z'||t==r;case'l':return t>='a'&&t<='z'||t>='A'&&t<='Z'||t==' '||t==r;case'A':return t>='0'&&t<='9'||t>='a'&&t<='z'||t>='A'&&t<='Z'||t==r;case'a':return t>='0'&&t<='9'||t>='a'&&t<='z'||t>='A'&&t<='Z'||t==' '||t==r;case'\uff19':return t>='\uFF10'&&t<='\uff19'||t==r;case'\uff2a':case'\uff27':return n=='\uff27'&&i._X_DBCS_BIG_HIRA.indexOf(t)>-1?!1:t>='\u3041'&&t<='\u3096'||t==r;case'\uff2b':case'\uff2e':return n=='\uff2e'&&i._X_DBCS_BIG_KATA.indexOf(t)>-1?!1:t>='\u30a1'&&t<='\u30fa'||t==r;case'\uff3a':return t<='\u0021'||t>='\u00ff'||t==r;case'H':return t>='\u0021'&&t<='\u00ff'||t==r;case'K':case'N':return n=='N'&&i._X_SBCS_BIG_KATA.indexOf(t)>-1?!1:t>='\uff66'&&t<='\uff9f'||t==r}return!1},i.prototype._validatePosition=function(t){var i=this._mskArr;if(this._backSpace)while(t>0&&t<i.length&&i[t-1].literal)t--;if(t==0||!this._backSpace)while(t<i.length&&i[t].literal)t++;n.getActiveElement()==this._tbx&&n.setSelectionRange(this._tbx,t);this._backSpace=!1},i.prototype._parseMask=function(){var r,o,f,i,e,u,s;for(this._mskArr=[],this._firstPos=-1,this._lastPos=-1,r=this._msk,o='|',i=0;r&&i<r.length;i++)switch(r[i]){case'0':case'9':case'#':case'A':case'a':case'L':case'l':case'\uff19':case'\uff2a':case'\uff27':case'\uff2b':case'\uff2e':case'\uff3a':case'K':case'N':case'H':this._firstPos<0&&(this._firstPos=this._mskArr.length);this._lastPos=this._mskArr.length;this._mskArr.push(new t(r[i],o));break;case'.':case',':case':':case'/':case'$':switch(r[i]){case'.':case',':f=n.culture.Globalize.numberFormat[r[i]];break;case':':case'/':f=n.culture.Globalize.calendar[r[i]];break;case'$':f=n.culture.Globalize.numberFormat.currency.symbol}for(u=0;u<f.length;u++)this._mskArr.push(new t(f[u]));break;case'<':case'>':case'|':o=r[i];break;case'\\':i<r.length-1&&i++;this._mskArr.push(new t(r[i]));break;default:this._mskArr.push(new t(r[i]))}for(i=0;i<this._mskArr.length;i++)if(e=this._mskArr[i],e.literal)for(u=0;u<i;u++)if(s=this._mskArr[u],s.wildCard&&this._isCharValid(s.wildCard,e.literal)){e.vague=!0;break}},i._X_DBCS_BIG_HIRA='\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308e\u3095\u3096',i._X_DBCS_BIG_KATA='\u30a1\u30a3\u30a5\u30a7\u30a9\u30c3\u30e3\u30e5\u30e7\u30ee\u30f5\u30f6',i._X_SBCS_BIG_KATA='\uff67\uff68\uff69\uff6a\uff6b\uff6c\uff6d\uff6e\uff6f',i}(),t;n._MaskProvider=i;t=function(){function n(n,t){t?(this.wildCard=n,this.charCase=t):this.literal=n}return n}();n._MaskElement=t}(wijmo||(wijmo={})),function(n){'use strict';function u(){return r}function f(){return i}var r=navigator.userAgent.match(/MSIE |Trident\/|Edge\//)!=null,i,t;n.isIE=u;n.isIE9=f;document.doctype&&navigator.appVersion.indexOf('MSIE 9')>-1&&(i=!0,document.addEventListener('mousemove',function(n){if(n.which==1)for(var t=n.target;t;t=t.parentNode)if(t.attributes&&t.attributes.draggable)return t.dragDrop(),!1}));window.requestAnimationFrame||(t=0,window.requestAnimationFrame=function(n){var i=Date.now(),r=16-(i-t),u=r>0?r:0;return t=i+u,setTimeout(function(){n(t)},u)},window.cancelAnimationFrame=clearTimeout)}(wijmo||(wijmo={}))
;
/*
    *
    * Wijmo Library 5.20162.207
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */

var wijmo;(function(n){n.culture={Globalize:{name:'en-GB',displayName:'English (United Kingdom)',numberFormat:{'.':'.',',':',',percent:{pattern:['-n%','n%']},currency:{decimals:2,symbol:'£',pattern:['-$n','$n']}},calendar:{'/':'/',':':':',firstDay:1,days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],daysAbbr:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],monthsAbbr:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],am:['AM','A'],pm:['PM','P'],eras:['A.D.'],patterns:{d:'dd/MM/yyyy',D:'dd MMMM yyyy',f:'dd MMMM yyyy HH:mm',F:'dd MMMM yyyy HH:mm:ss',t:'HH:mm',T:'HH:mm:ss',m:'d MMMM',M:'d MMMM',y:'MMMM yyyy',Y:'MMMM yyyy',g:'dd/MM/yyyy HH:mm',G:'dd/MM/yyyy HH:mm:ss',s:'yyyy"-"MM"-"dd"T"HH":"mm":"ss'},fiscalYearOffsets:[3,3]}},MultiSelect:{itemsSelected:'{count:n0} items selected'},FlexGrid:{groupHeaderFormat:'{name}: <b>{value} </b>({count:n0} items)'},FlexGridFilter:{ascending:'\u2191 Ascending',descending:'\u2193 Descending',apply:'Apply',clear:'Clear',conditions:'Filter by Condition',values:'Filter by Value',search:'Search',selectAll:'Select All',null:'(nothing)',header:'Show items where the value',and:'And',or:'Or',stringOperators:[{name:'(not set)',op:null},{name:'Equals',op:0},{name:'Does not equal',op:1},{name:'Begins with',op:6},{name:'Ends with',op:7},{name:'Contains',op:8},{name:'Does not contain',op:9}],numberOperators:[{name:'(not set)',op:null},{name:'Equals',op:0},{name:'Does not equal',op:1},{name:'Is Greater than',op:2},{name:'Is Greater than or equal to',op:3},{name:'Is Less than',op:4},{name:'Is Less than or equal to',op:5}],dateOperators:[{name:'(not set)',op:null},{name:'Equals',op:0},{name:'Is Before',op:4},{name:'Is After',op:3}],booleanOperators:[{name:'(not set)',op:null},{name:'Equals',op:0},{name:'Does not equal',op:1}]},olap:{PivotFieldEditor:{dialogHeader:'Field settings:',header:'Header:',summary:'Summary:',showAs:'Show As:',weighBy:'Weigh by:',sort:'Sort:',filter:'Filter:',format:'Format:',sample:'Sample:',edit:'Edit...',clear:'Clear',ok:'OK',cancel:'Cancel',none:'(none)',sorts:{asc:'Ascending',desc:'Descending'},aggs:{sum:'Sum',cnt:'Count',avg:'Average',max:'Max',min:'Min',rng:'Range',std:'StdDev',var:'Var',stdp:'StdDevPop',varp:'VarPop'},calcs:{noCalc:'No Calculation',dRow:'Difference from previous row',dRowPct:'% Difference from previous row',dCol:'Difference from previous column',dColPct:'% Difference from previous column'},formats:{n0:'Integer (n0)',n2:'Float (n2)',c:'Currency (c)',p0:'Percentage (p0)',p2:'Percentage (p2)',n2c:'Thousands (n2,)',n2cc:'Millions (n2,,)',n2ccc:'Billions (n2,,,)',d:'Date (d)',MMMMddyyyy:'Month Day Year (MMMM dd, yyyy)',dMyy:'Day Month Year (d/M/yy)',ddMyy:'Day Month Year (dd/M/yy)',dMyyyy:'Day Month Year (dd/M/yyyy)',MMMyyyy:'Month Year (MMM yyyy)',MMMMyyyy:'Month Year (MMMM yyyy)',yyyyQq:'Year Quarter (yyyy "Q"q)',FYEEEEQU:'Fiscal Year Quarter ("FY"EEEE "Q"U)'}},PivotEngine:{grandTotal:'Grand Total',subTotal:'Subtotal'},PivotPanel:{fields:'Choose fields to add to report',drag:'Drag fields between areas below:',filters:'Filters',cols:'Columns',rows:'Rows',vals:'Values',defer:'Defer Updates',update:'Update'},_ListContextMenu:{up:'Move Up',down:'Move Down',first:'Move to Beginning',last:'Move to End',filter:'Move to Report Filter',rows:'Move to Row Labels',cols:'Move to Column Labels',vals:'Move to Values',remove:'Remove Field',edit:'Field Settings...',detail:'Show Detail...'},PivotChart:{by:'by',and:'and'},DetailDialog:{header:'Detail View:',ok:'OK',items:'{cnt:n0} items',item:'{cnt} item',row:'Row',col:'Column'}}}})(wijmo||(wijmo={}))
;
/*
    *
    * Wijmo Library 5.20162.207
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */

var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},wijmo;wijmo.culture.FlexGrid={groupHeaderFormat:'{name}: <b>{value} </b>({count:n0} items)'},function(n){var t;(function(t){'use strict';(function(n){n[n.None=0]="None";n[n.Column=1]="Column";n[n.Row=2]="Row";n[n.All=3]="All"})(t.HeadersVisibility||(t.HeadersVisibility={}));var i=t.HeadersVisibility,r=function(r){function u(u,f){var e=this,s,h,o;r.call(this,u,null,!0);this._szClient=new n.Size(0,0);this._ptScrl=new n.Point(0,0);this._rtl=!1;this._cellPadding=3;this._autoGenCols=!0;this._autoClipboard=!0;this._readOnly=!1;this._indent=14;this._autoSizeMode=t.AutoSizeMode.Both;this._hdrVis=i.All;this._alSorting=!0;this._alAddNew=!1;this._alDelete=!1;this._alResizing=t.AllowResizing.Columns;this._alDragging=t.AllowDragging.Columns;this._alMerging=t.AllowMerging.None;this._ssHdr=i.None;this._shSort=!0;this._shGroups=!0;this._shAlt=!0;this._deferResizing=!1;this._pSel=!0;this._pOutline=!0;this.itemsSourceChanged=new n.Event;this.scrollPositionChanged=new n.Event;this.selectionChanging=new n.Event;this.selectionChanged=new n.Event;this.loadingRows=new n.Event;this.loadedRows=new n.Event;this.updatingLayout=new n.Event;this.updatedLayout=new n.Event;this.resizingColumn=new n.Event;this.resizedColumn=new n.Event;this.autoSizingColumn=new n.Event;this.autoSizedColumn=new n.Event;this.draggingColumn=new n.Event;this.draggedColumn=new n.Event;this.resizingRow=new n.Event;this.resizedRow=new n.Event;this.autoSizingRow=new n.Event;this.autoSizedRow=new n.Event;this.draggingRow=new n.Event;this.draggedRow=new n.Event;this.groupCollapsedChanging=new n.Event;this.groupCollapsedChanged=new n.Event;this.sortingColumn=new n.Event;this.sortedColumn=new n.Event;this.beginningEdit=new n.Event;this.prepareCellForEdit=new n.Event;this.cellEditEnding=new n.Event;this.cellEditEnded=new n.Event;this.rowEditEnding=new n.Event;this.rowEditEnded=new n.Event;this.rowAdded=new n.Event;this.deletingRow=new n.Event;this.deletedRow=new n.Event;this.copying=new n.Event;this.copied=new n.Event;this.pasting=new n.Event;this.pasted=new n.Event;this.pastingCell=new n.Event;this.pastedCell=new n.Event;this.formatItem=new n.Event;this.updatingView=new n.Event;this.updatedView=new n.Event;this._mappedColumns=null;s=this.hostElement;n.isIE()&&(s.style.borderRadius='0px');h=this.getTemplate();this.applyTemplate('wj-control wj-flexgrid wj-content',h,{_root:'root',_eSz:'sz',_eCt:'cells',_fCt:'fcells',_eTL:'tl',_eBL:'bl',_eCHdr:'ch',_eRHdr:'rh',_eCFtr:'cf',_eTLCt:'tlcells',_eBLCt:'blcells',_eCHdrCt:'chcells',_eCFtrCt:'cfcells',_eRHdrCt:'rhcells',_eMarquee:'marquee',_eFocus:'focus'});o=this._getDefaultRowHeight();this.deferUpdate(function(){e._rows=new t.RowCollection(e,o);e._cols=new t.ColumnCollection(e,o*4);e._hdrRows=new t.RowCollection(e,o);e._hdrCols=new t.ColumnCollection(e,Math.round(o*1.25));e._ftrRows=new t.RowCollection(e,o);e._gpTL=new t.GridPanel(e,t.CellType.TopLeft,e._hdrRows,e._hdrCols,e._eTLCt);e._gpCHdr=new t.GridPanel(e,t.CellType.ColumnHeader,e._hdrRows,e._cols,e._eCHdrCt);e._gpRHdr=new t.GridPanel(e,t.CellType.RowHeader,e._rows,e._hdrCols,e._eRHdrCt);e._gpCells=new t.GridPanel(e,t.CellType.Cell,e._rows,e._cols,e._eCt);e._gpBL=new t.GridPanel(e,t.CellType.BottomLeft,e._ftrRows,e._hdrCols,e._eBLCt);e._gpCFtr=new t.GridPanel(e,t.CellType.ColumnFooter,e._ftrRows,e._cols,e._eCFtrCt);e._hdrRows.push(new t.Row);e._hdrCols.push(new t.Column);e._hdrCols[0].align='center';e._cf=new t.CellFactory;e._keyHdl=new t._KeyboardHandler(e);e._mouseHdl=new t._MouseHandler(e);e._edtHdl=new t._EditHandler(e);e._selHdl=new t._SelectionHandler(e);e._addHdl=new t._AddNewHandler(e);e._mrgMgr=new t.MergeManager(e);e._bndSortConverter=e._sortConverter.bind(e);e.initialize(f)});this.addEventListener(this._root,'scroll',function(){e._updateScrollPosition()&&(e._afScrl&&cancelAnimationFrame(e._afScrl),e._afScrl=requestAnimationFrame(function(){e.finishEditing();e._updateContent(!0);e._afScrl=null}))})}return __extends(u,r),u.prototype._handleResize=function(){r.prototype._handleResize.call(this);this._rcBounds=null},Object.defineProperty(u.prototype,"headersVisibility",{get:function(){return this._hdrVis},set:function(t){t!=this._hdrVis&&(this._hdrVis=n.asEnum(t,i),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"stickyHeaders",{get:function(){return this._stickyHdr},set:function(t){var i=this;t!=this._stickyHdr&&(this._stickyHdr=n.asBoolean(t),this._updateStickyHeaders(),this.removeEventListener(window,'scroll'),this._stickyHdr&&this.addEventListener(window,'scroll',function(t){n.contains(t.target,i.hostElement)&&(i._toSticky&&cancelAnimationFrame(i._toSticky),i._toSticky=requestAnimationFrame(function(){var t=new n.CancelEventArgs;if(i.onUpdatingLayout(t)){i._updateStickyHeaders();i.onUpdatedLayout(t)}i._toSticky=null}))},!0))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"preserveSelectedState",{get:function(){return this._pSel},set:function(t){this._pSel=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"preserveOutlineState",{get:function(){return this._pOutline},set:function(t){this._pOutline=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"autoGenerateColumns",{get:function(){return this._autoGenCols},set:function(t){this._autoGenCols=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"autoClipboard",{get:function(){return this._autoClipboard},set:function(t){this._autoClipboard=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"columnLayout",{get:function(){for(var c,o,r,i,f,s=u._getSerializableProperties(t.Column),l=new t.Column,h=[],e=0;e<this.columns.length;e++){for(c=this.columns[e],o={},r=0;r<s.length;r++)i=s[r],f=c[i],f!=l[i]&&n.isPrimitive(f)&&i!='size'&&(o[i]=f);h.push(o)}return JSON.stringify({columns:h})},set:function(t){var i=JSON.parse(n.asString(t));if(!i||i.columns==null)throw'Invalid columnLayout data.';this.columns.clear();this.initialize(i)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isReadOnly",{get:function(){return this._readOnly},set:function(t){t!=this._readOnly&&(this._readOnly=n.asBoolean(t),this.finishEditing(),this.invalidate(!0),this._addHdl.updateNewRowTemplate(),n.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"imeEnabled",{get:function(){return this._imeHdl!=null},set:function(n){n!=this.imeEnabled&&(this._imeHdl&&(this._imeHdl.dispose(),this._imeHdl=null),n&&(this._imeHdl=new t._ImeHandler(this)))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowResizing",{get:function(){return this._alResizing},set:function(i){this._alResizing=n.asEnum(i,t.AllowResizing)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"deferResizing",{get:function(){return this._deferResizing},set:function(t){this._deferResizing=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"autoSizeMode",{get:function(){return this._autoSizeMode},set:function(i){this._autoSizeMode=n.asEnum(i,t.AutoSizeMode)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowSorting",{get:function(){return this._alSorting},set:function(t){this._alSorting=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowAddNew",{get:function(){return this._alAddNew},set:function(t){t!=this._alAddNew&&(this._alAddNew=n.asBoolean(t),this._addHdl.updateNewRowTemplate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"newRowAtTop",{get:function(){return this._addHdl.newRowAtTop},set:function(t){this._addHdl.newRowAtTop=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowDelete",{get:function(){return this._alDelete},set:function(t){t!=this._alDelete&&(this._alDelete=n.asBoolean(t))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowMerging",{get:function(){return this._alMerging},set:function(i){i!=this._alMerging&&(this._alMerging=n.asEnum(i,t.AllowMerging),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showSelectedHeaders",{get:function(){return this._ssHdr},set:function(t){t!=this._ssHdr&&(this._ssHdr=n.asEnum(t,i),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showMarquee",{get:function(){return!this._eMarquee.style.display},set:function(t){if(t!=this.showMarquee){var i=this._eMarquee.style;i.visibility='collapse';i.display=n.asBoolean(t)?'':'none';this.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showSort",{get:function(){return this._shSort},set:function(t){t!=this._shSort&&(this._shSort=n.asBoolean(t),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showGroups",{get:function(){return this._shGroups},set:function(t){t!=this._shGroups&&(this._shGroups=n.asBoolean(t),this._bindGrid(!1))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showAlternatingRows",{get:function(){return this._shAlt},set:function(t){t!=this._shAlt&&(this._shAlt=n.asBoolean(t),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"groupHeaderFormat",{get:function(){return this._gHdrFmt},set:function(t){t!=this._gHdrFmt&&(this._gHdrFmt=n.asString(t),this._bindGrid(!1))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowDragging",{get:function(){return this._alDragging},set:function(i){i!=this._alDragging&&(this._alDragging=n.asEnum(i,t.AllowDragging),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"itemsSource",{get:function(){return this._items},set:function(t){var i;t!=this._items&&(this._cv&&(i=n.tryCast(this._cv,n.collections.CollectionView),i&&i.sortConverter==this._bndSortConverter&&(i.sortConverter=null),this._cv.currentChanged.removeHandler(this._cvCurrentChanged,this),this._cv.collectionChanged.removeHandler(this._cvCollectionChanged,this),this._cv=null),this._items=t,this._cv=this._getCollectionView(t),this._lastCount=0,this._cv&&(this._cv.currentChanged.addHandler(this._cvCurrentChanged,this),this._cv.collectionChanged.addHandler(this._cvCollectionChanged,this),i=n.tryCast(this._cv,n.collections.CollectionView),i&&!i.sortConverter&&(i.sortConverter=this._bndSortConverter)),this._bindGrid(!0),this.onItemsSourceChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"collectionView",{get:function(){return this._cv},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"childItemsPath",{get:function(){return this._childItemsPath},set:function(t){t!=this._childItemsPath&&(n.assert(t==null||n.isArray(t)||n.isString(t),'childItemsPath should be an array or a string.'),this._childItemsPath=t,this._bindGrid(!0))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"cells",{get:function(){return this._gpCells},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"columnHeaders",{get:function(){return this._gpCHdr},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"columnFooters",{get:function(){return this._gpCFtr},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"rowHeaders",{get:function(){return this._gpRHdr},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"topLeftCells",{get:function(){return this._gpTL},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"bottomLeftCells",{get:function(){return this._gpBL},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"rows",{get:function(){return this._rows},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"columns",{get:function(){return this._cols},enumerable:!0,configurable:!0}),u.prototype.getColumn=function(n){return this.columns.getColumn(n)},Object.defineProperty(u.prototype,"frozenRows",{get:function(){return this.rows.frozen},set:function(n){this.rows.frozen=n},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"frozenColumns",{get:function(){return this.columns.frozen},set:function(n){this.columns.frozen=n},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"sortRowIndex",{get:function(){return this._sortRowIndex},set:function(t){t!=this._sortRowIndex&&(this._sortRowIndex=n.asNumber(t,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"scrollPosition",{get:function(){return this._ptScrl.clone()},set:function(n){var t=this._root,i=-n.x;if(this._rtl)switch(u._getRtlMode()){case'rev':i=t.scrollWidth-t.clientWidth+n.x;break;case'neg':i=n.x;break;default:i=-n.x}t.scrollLeft=i;t.scrollTop=-n.y},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"clientSize",{get:function(){return this._szClient},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"controlRect",{get:function(){return this._rcBounds||(this._rcBounds=n.getElementRect(this._root)),this._rcBounds},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"scrollSize",{get:function(){return new n.Size(this._gpCells.width,this._heightBrowser)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"viewRange",{get:function(){return this._gpCells.viewRange},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"cellFactory",{get:function(){return this._cf},set:function(i){i!=this._cf&&(this._cf=n.asType(i,t.CellFactory,!1),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"itemFormatter",{get:function(){return this._itemFormatter},set:function(t){t!=this._itemFormatter&&(this._itemFormatter=n.asFunction(t),this.invalidate())},enumerable:!0,configurable:!0}),u.prototype.getCellData=function(n,t,i){return this.cells.getCellData(n,t,i)},u.prototype.getCellBoundingRect=function(n,t,i){return this.cells.getCellBoundingRect(n,t,i)},u.prototype.setCellData=function(n,t,i,r,u){return r===void 0&&(r=!0),u===void 0&&(u=!0),this.cells.setCellData(n,t,i,r,u)},u.prototype.hitTest=function(i,r){return n.isNumber(i)&&n.isNumber(r)&&(i=new n.Point(i,r)),new t.HitTestInfo(this,i)},u.prototype.getClipString=function(i){var f='',s=!0,o=!0,r,u,e;for(i=i?n.asType(i,t.CellRange):this.selection,r=i.topRow;r<=i.bottomRow;r++)if(this.rows[r].isVisible)for(s||(f+='\n'),s=!1,u=i.leftCol,o=!0;u<=i.rightCol;u++)this.columns[u].isVisible&&(o||(f+='\t'),o=!1,e=this.cells.getCellData(r,u,!0).toString(),e=e.replace(/\t/g,' '),f+=e);return f},u.prototype.setClipString=function(i,r){var y=r==null,e,s,l,u,h,o;r=r?n.asType(r,t.CellRange):this.selection;i=n.asString(i).replace(/\r\n/g,'\n').replace(/\r/g,'\n');i&&i[i.length-1]=='\n'&&(i=i.substring(0,i.length-1));y&&!r.isSingleCell&&(i=this._expandClipString(i,r));e=new t.CellRange(r.topRow,r.leftCol);this.beginUpdate();var f=r.topRow,a=i.split('\n'),v=!1,c;for(s=0;s<a.length&&f<this.rows.length;s++,f++){if(!this.rows[f].isVisible){s--;continue}for(l=a[s].split('\t'),u=r.leftCol,h=0;h<l.length&&u<this.columns.length;h++,u++){if(!this.columns[u].isVisible){h--;continue}if(!this.columns[u].isReadOnly&&!this.rows[f].isReadOnly){if(c=new t.CellRangeEventArgs(this.cells,new t.CellRange(f,u),l[h]),this.onPastingCell(c)&&this.cells.setCellData(f,u,c.data)){this.onPastedCell(c);v=!0}e.row2=Math.max(e.row2,f);e.col2=Math.max(e.col2,u)}}}this.endUpdate();v&&(o=n.tryCast(this.collectionView,'IEditableCollectionView'),o&&o.currentItem==o.currentAddItem?o.editItem(o.currentItem):this.collectionView&&this.collectionView.refresh());this.select(e)},u.prototype._expandClipString=function(n,t){var s,r,u,i,f;if(!n)return n;var h=n.split('\n'),o=h.length,e=0,c=[];for(i=0;i<o;i++){if(s=h[i].split('\t'),c.push(s),i>1&&s.length!=e)return n;e=s.length}if(r=t.rowSpan,u=t.columnSpan,(r>1||u>1)&&(r==1&&(r=o),u==1&&(u=e),u%e==0&&r%o==0))for(n='',i=0;i<r;i++)for(f=0;f<u;f++)i>0&&f==0&&(n+='\n'),f>0&&(n+='\t'),n+=c[i%o][f%e];return n},u.prototype.focus=function(){var t,i;if(this.activeEditor){this.activeEditor.focus();return}if(n.getActiveElement()!=this._eFocus){if(t=this.hostElement.getBoundingClientRect(),t.bottom>0&&t.right>0&&t.top<innerHeight&&t.left<innerWidth){n.setCss(this._eFocus,{top:Math.max(0,-t.top),left:Math.max(0,-t.left)});this._eFocus.focus();return}if(i=this.cells.hostElement.querySelector('.wj-cell.wj-state-selected'),i){i.focus();return}r.prototype.focus.call(this)}},u.prototype.containsFocus=function(){var n=this._edtHdl?this._edtHdl._lbx:null;return r.prototype.containsFocus.call(this)||n&&n.containsFocus()},u.prototype.dispose=function(){this.finishEditing(!0);this.itemsSource=null;this._afScrl&&cancelAnimationFrame(this._afScrl);r.prototype.dispose.call(this)},u.prototype.refresh=function(n){n===void 0&&(n=!0);r.prototype.refresh.call(this,n);this.finishEditing();n&&(this._updateColumnTypes(),this.scrollPosition=this._ptScrl);this.refreshCells(n)},u.prototype.refreshCells=function(n,t,i){this.isUpdating||(n?this._updateLayout():this._updateContent(t,i))},u.prototype.autoSizeColumn=function(n,t,i){t===void 0&&(t=!1);i===void 0&&(i=4);this.autoSizeColumns(n,n,t,i)},u.prototype.autoSizeColumns=function(i,r,f,e){var h=this;f===void 0&&(f=!1);e===void 0&&(e=4);var s=0,l=f?this.topLeftCells:this.columnHeaders,o=f?this.rowHeaders:this.cells,c=this.viewRange,a,v;i=i==null?0:n.asInt(i);r=r==null?o.columns.length-1:n.asInt(r);n.asBoolean(f);n.asNumber(e);c.row=Math.max(0,c.row-1e3);c.row2=Math.min(c.row2+1e3,this.rows.length-1);this.deferUpdate(function(){var p=document.createElement('div'),y,n,w;for(p.setAttribute(u._WJS_MEASURE,'true'),p.style.visibility='hidden',h.hostElement.appendChild(p),y=i;y<=r&&y>-1&&y<o.columns.length;y++){if(s=0,h.autoSizeMode&t.AutoSizeMode.Headers)for(n=0;n<l.rows.length;n++)l.rows[n].isVisible&&(w=h._getDesiredWidth(l,n,y,p),s=Math.max(s,w));if(h.autoSizeMode&t.AutoSizeMode.Cells)for(v=null,n=c.row;n<=c.row2&&n>-1&&n<o.rows.length;n++)o.rows[n].isVisible&&(!f&&y==o.columns.firstVisibleIndex&&o.rows.maxGroupLevel>-1?(w=h._getDesiredWidth(o,n,y,p),s=Math.max(s,w)):(a=o.getCellData(n,y,!0),a!=v&&(v=a,w=h._getDesiredWidth(o,n,y,p),s=Math.max(s,w))));o.columns[y].width=s+e+2}h.hostElement.removeChild(p)})},u.prototype.autoSizeRow=function(n,t,i){t===void 0&&(t=!1);i===void 0&&(i=0);this.autoSizeRows(n,n,t,i)},u.prototype.autoSizeRows=function(i,r,f,e){var o=this;f===void 0&&(f=!1);e===void 0&&(e=0);var s=0,c=f?this.topLeftCells:this.rowHeaders,h=f?this.columnHeaders:this.cells;f=n.asBoolean(f);e=n.asNumber(e);i=i==null?0:n.asInt(i);r=r==null?h.rows.length-1:n.asInt(r);this.deferUpdate(function(){var l=document.createElement('div'),f,n,a;for(l.setAttribute(u._WJS_MEASURE,'true'),l.style.visibility='hidden',o.hostElement.appendChild(l),f=i;f<=r&&f>-1&&f<h.rows.length;f++){if(s=0,o.autoSizeMode&t.AutoSizeMode.Headers)for(n=0;n<c.columns.length;n++)c.columns[n].renderSize>0&&(a=o._getDesiredHeight(c,f,n,l),s=Math.max(s,a));if(o.autoSizeMode&t.AutoSizeMode.Cells)for(n=0;n<h.columns.length;n++)h.columns[n].renderSize>0&&(a=o._getDesiredHeight(h,f,n,l),s=Math.max(s,a));h.rows[f].height=s+e}o.hostElement.removeChild(l)})},Object.defineProperty(u.prototype,"treeIndent",{get:function(){return this._indent},set:function(t){t!=this._indent&&(this._indent=n.asNumber(t,!1,!0),this.columns.onCollectionChanged())},enumerable:!0,configurable:!0}),u.prototype.collapseGroupsToLevel=function(i){if(this.finishEditing()){var r=this.rows;r.deferUpdate(function(){for(var f,u=0;u<r.length;u++)f=n.tryCast(r[u],t.GroupRow),f&&(f.isCollapsed=f.level>=i)})}},Object.defineProperty(u.prototype,"selectionMode",{get:function(){return this._selHdl.selectionMode},set:function(i){i!=this.selectionMode&&(this._selHdl.selectionMode=n.asEnum(i,t.SelectionMode),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"selection",{get:function(){return this._selHdl.selection.clone()},set:function(n){this._selHdl.selection=n},enumerable:!0,configurable:!0}),u.prototype.select=function(n,t){t===void 0&&(t=!0);this._selHdl.select(n,t)},u.prototype.getSelectedState=function(n,t){return this.cells.getSelectedState(n,t,null)},Object.defineProperty(u.prototype,"selectedRows",{get:function(){var i=[],r,n;if(this.selectionMode==t.SelectionMode.ListBox)for(n=0;n<this.rows.length;n++)this.rows[n].isSelected&&i.push(this.rows[n]);else if(this.rows.length)for(r=this.selection,n=r.topRow;n>-1&&n<=r.bottomRow;n++)i.push(this.rows[n]);return i},set:function(i){var r=this;n.assert(this.selectionMode==t.SelectionMode.ListBox,'This property can be set only in ListBox mode.');i=n.asArray(i);this.deferUpdate(function(){for(var u,f,n=0,t=!0;n<r.rows.length;n++)u=r.rows[n],f=i&&i.indexOf(u)>-1,f&&t&&(t=!1,r.select(n,r.selection.col)),u.isSelected=f})},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"selectedItems",{get:function(){for(var n=this.selectedRows,t=0;t<n.length;t++)n[t]=n[t].dataItem;return n},set:function(i){var r=this;n.assert(this.selectionMode==t.SelectionMode.ListBox,'This property can be set only in ListBox mode.');i=n.asArray(i);this.deferUpdate(function(){for(var u,f,n=0,t=!0;n<r.rows.length;n++)u=r.rows[n],f=i&&i.indexOf(u.dataItem)>-1,f&&t&&(t=!1,r.select(n,r.selection.col)),u.isSelected=f})},enumerable:!0,configurable:!0}),u.prototype.scrollIntoView=function(t,i){var u,h;this._maxOffsetY==null&&this._updateLayout();var r=this.scrollPosition,c=this._szClient.width,f=this._szClient.height-this._gpCFtr.rows.getTotalSize(),e=this.cells._getFrozenPos();if(t=n.asInt(t),t>-1&&t<this._rows.length&&t>=this._rows.frozen){var s=this._rows[t],a=this.cells.height>f?Math.round(s.pos/(this.cells.height-f)*100)/100:0,v=Math.round(this._maxOffsetY*a),o=s.pos-v,l=o+s.renderSize-1;l>f-r.y&&(r.y=Math.max(-o,f-l));o-e.y<-r.y&&(r.y=-(o-e.y))}return(i=n.asInt(i),i>-1&&i<this._cols.length&&i>=this._cols.frozen&&(u=this._cols[i],h=u.pos+u.renderSize-1,h>-r.x+c&&(r.x=Math.max(-u.pos,c-h)),u.pos-e.x<-r.x&&(r.x=-(u.pos-e.x))),!r.equals(this._ptScrl))?(this.scrollPosition=r,!0):!1},u.prototype.isRangeValid=function(n){return n.isValid&&n.bottomRow<this.rows.length&&n.rightCol<this.columns.length},u.prototype.startEditing=function(n,t,i,r){return n===void 0&&(n=!0),this._edtHdl.startEditing(n,t,i,r)},u.prototype.finishEditing=function(n){return n===void 0&&(n=!1),this._edtHdl.finishEditing(n)},Object.defineProperty(u.prototype,"activeEditor",{get:function(){return this._edtHdl.activeEditor},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"editRange",{get:function(){return this._edtHdl.editRange},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"mergeManager",{get:function(){return this._mrgMgr},set:function(i){i!=this._mrgMgr&&(this._mrgMgr=n.asType(i,t.MergeManager,!0),this.invalidate())},enumerable:!0,configurable:!0}),u.prototype.getMergedRange=function(n,t,i,r){return r===void 0&&(r=!0),this._mrgMgr?this._mrgMgr.getMergedRange(n,t,i,r):null},u.prototype.onItemsSourceChanged=function(n){this.itemsSourceChanged.raise(this,n)},u.prototype.onScrollPositionChanged=function(n){this.scrollPositionChanged.raise(this,n)},u.prototype.onSelectionChanging=function(n){return this.selectionChanging.raise(this,n),!n.cancel},u.prototype.onSelectionChanged=function(n){this.selectionChanged.raise(this,n)},u.prototype.onLoadingRows=function(n){return this.loadingRows.raise(this,n),!n.cancel},u.prototype.onLoadedRows=function(n){this.loadedRows.raise(this,n)},u.prototype.onUpdatingLayout=function(n){return this.updatingLayout.raise(this,n),!n.cancel},u.prototype.onUpdatedLayout=function(n){this.updatedLayout.raise(this,n)},u.prototype.onResizingColumn=function(n){return this.resizingColumn.raise(this,n),!n.cancel},u.prototype.onResizedColumn=function(n){this.resizedColumn.raise(this,n)},u.prototype.onAutoSizingColumn=function(n){return this.autoSizingColumn.raise(this,n),!n.cancel},u.prototype.onAutoSizedColumn=function(n){this.autoSizedColumn.raise(this,n)},u.prototype.onDraggingColumn=function(n){return this.draggingColumn.raise(this,n),!n.cancel},u.prototype.onDraggedColumn=function(n){this.draggedColumn.raise(this,n)},u.prototype.onResizingRow=function(n){return this.resizingRow.raise(this,n),!n.cancel},u.prototype.onResizedRow=function(n){this.resizedRow.raise(this,n)},u.prototype.onAutoSizingRow=function(n){return this.autoSizingRow.raise(this,n),!n.cancel},u.prototype.onAutoSizedRow=function(n){this.autoSizedRow.raise(this,n)},u.prototype.onDraggingRow=function(n){return this.draggingRow.raise(this,n),!n.cancel},u.prototype.onDraggedRow=function(n){this.draggedRow.raise(this,n)},u.prototype.onGroupCollapsedChanging=function(n){return this.groupCollapsedChanging.raise(this,n),!n.cancel},u.prototype.onGroupCollapsedChanged=function(n){this.groupCollapsedChanged.raise(this,n)},u.prototype.onSortingColumn=function(n){return this.sortingColumn.raise(this,n),!n.cancel},u.prototype.onSortedColumn=function(n){this.sortedColumn.raise(this,n)},u.prototype.onBeginningEdit=function(n){return this.beginningEdit.raise(this,n),!n.cancel},u.prototype.onPrepareCellForEdit=function(n){this.prepareCellForEdit.raise(this,n)},u.prototype.onCellEditEnding=function(n){return this.cellEditEnding.raise(this,n),!n.cancel},u.prototype.onCellEditEnded=function(n){this.cellEditEnded.raise(this,n)},u.prototype.onRowEditEnding=function(n){this.rowEditEnding.raise(this,n)},u.prototype.onRowEditEnded=function(n){this.rowEditEnded.raise(this,n)},u.prototype.onRowAdded=function(n){this.rowAdded.raise(this,n)},u.prototype.onDeletingRow=function(n){return this.deletingRow.raise(this,n),!n.cancel},u.prototype.onDeletedRow=function(n){this.deletedRow.raise(this,n)},u.prototype.onCopying=function(n){return this.copying.raise(this,n),!n.cancel},u.prototype.onCopied=function(n){this.copied.raise(this,n)},u.prototype.onPasting=function(n){return this.pasting.raise(this,n),!n.cancel},u.prototype.onPasted=function(n){this.pasted.raise(this,n)},u.prototype.onPastingCell=function(n){return this.pastingCell.raise(this,n),!n.cancel},u.prototype.onPastedCell=function(n){this.pastedCell.raise(this,n)},u.prototype.onFormatItem=function(n){this.formatItem.raise(this,n)},u.prototype.onUpdatingView=function(n){return this.updatingView.raise(this,n),!n.cancel},u.prototype.onUpdatedView=function(n){this.updatedView.raise(this,n)},u.prototype._getDefaultRowHeight=function(){var f=this.hostElement,t=document.body,i=null,r,e,u;if(t&&!n.contains(t,f)){for(r=f;r;r=r.parentElement)i=r;i&&t.appendChild(i)}return e=n.createElement('<div class="wj-cell">123</div>',f),u=e.scrollHeight+2,f.removeChild(e),i&&t.removeChild(i),(u<=6||isNaN(u)||!t)&&(u=28),u},u.prototype._getCollectionView=function(t){return n.asCollectionView(t)},u.prototype._getDesiredWidth=function(n,t,i,r){var u=this.getMergedRange(n,t,i),f;return this.cellFactory.updateCell(n,t,i,r,u),r.style.width='',f=r.offsetWidth,u&&u.columnSpan>1?f/u.columnSpan:f},u.prototype._getDesiredHeight=function(n,t,i,r){var u=this.getMergedRange(n,t,i),f;return this.cellFactory.updateCell(n,t,i,r,u),r.style.height='',f=r.offsetHeight,u&&u.rowSpan>1?f/u.rowSpan:f},u.prototype._getSortRowIndex=function(){return this._sortRowIndex!=null?this._sortRowIndex:this.columnHeaders.rows.length-1},u.prototype._sortConverter=function(n,t,i,r){var u,o,f,e;if(r){if(this._mappedColumns=null,this.collectionView)for(o=this.collectionView.sortDescriptions,f=0;f<o.length;f++)u=this.columns.getColumn(o[f].property),u&&u.dataMap&&(this._mappedColumns||(this._mappedColumns={}),this._mappedColumns[u.binding]=u.dataMap);this._mouseHdl._htDown&&this._mouseHdl._htDown.col>-1&&(u=this.columns[this._mouseHdl._htDown.col],this._mappedColumns&&u.dataMap&&(this._mappedColumns[u.binding]=u.dataMap))}return this._mappedColumns&&(e=this._mappedColumns[n.property],e&&e.sortByDisplayValues&&(i=e.getDisplayValue(i))),i},u.prototype._bindGrid=function(i){var r=this;this.deferUpdate(function(){var f,s,h,e,o,c,l,u;if(r._lastCount==0&&r._cv&&r._cv.items&&r._cv.items.length&&(i=!0),f=[],r.preserveSelectedState&&r.selectionMode==t.SelectionMode.ListBox)for(u=0;u<r.rows.length;u++)s=r.rows[u],s.isSelected&&s.dataItem&&f.push(s.dataItem);if(r.preserveOutlineState&&n.isFunction(window.Map)&&r.rows.maxGroupLevel>-1)for(h=new Map,u=0;u<r.rows.length;u++)e=r.rows[u],e instanceof t.GroupRow&&e.isCollapsed&&e.dataItem&&(o=e.dataItem,o instanceof n.collections.CollectionViewGroup&&(o=o._path),h.set(o,!0));if(i&&r.columns.deferUpdate(function(){r._bindColumns()}),r.rows.deferUpdate(function(){r._bindRows()}),c=0,f.length)for(u=0;u<r.rows.length&&c<f.length;u++)f.indexOf(r.rows[u].dataItem)>-1&&(r.rows[u].isSelected=!0,c++);if(r.selectionMode==t.SelectionMode.ListBox&&c==0)for(l=r.selection,u=l.topRow;u<=l.bottomRow&&u>-1&&u<r.rows.length;u++)r.rows[u].isSelected=!0;h&&r.rows.deferUpdate(function(){for(var f,i,u=0;u<r.rows.length;u++)f=r.rows[u],f instanceof t.GroupRow&&(i=f.dataItem,i instanceof n.collections.CollectionViewGroup&&(i=i._path),h.get(i)&&(f.isCollapsed=!0))});!r._lastCount&&r._cv&&r._cv.items&&(r._lastCount=r._cv.items.length)});this.collectionView&&this._cvCurrentChanged(this.collectionView,n.EventArgs.empty)},u.prototype._cvCollectionChanged=function(i,r){var u;if(this.autoGenerateColumns&&this.columns.length==0){this._bindGrid(!0);return}if(this.childItemsPath&&r.action!=n.collections.NotifyCollectionChangedAction.Change){this._bindGrid(!1);return}switch(r.action){case n.collections.NotifyCollectionChangedAction.Change:this.invalidate();return;case n.collections.NotifyCollectionChangedAction.Add:if(r.index==this.collectionView.items.length-1){u=this.rows.length;this.rows[u-1]instanceof t._NewRowTemplate&&u--;this.rows.insert(u,new t.Row(r.item));return}n.assert(!1,'added item should be the last one.');break;case n.collections.NotifyCollectionChangedAction.Remove:if(u=this._findRow(r.item),u>-1){this.rows.removeAt(u);this._cvCurrentChanged(i,r);return}n.assert(!1,'removed item not found in grid.')}this._bindGrid(!1)},u.prototype._cvCurrentChanged=function(){if(this.collectionView){var i=this.selection,r=i.row>-1&&i.row<this.rows.length?this.rows[i.row].dataItem:null;r instanceof n.collections.CollectionViewGroup&&(r=null);r!=this.collectionView.currentItem&&(i.row=i.row2=this._getRowIndex(this.collectionView.currentPosition),this.select(i,!1),this.selectionMode!=t.SelectionMode.None&&this.scrollIntoView(i.row,-1))}},u.prototype._getRowIndex=function(n){var r,n,i;if(this.collectionView){if(n>-1){for(r=this.collectionView.items[n];n<this.rows.length;n++)if(this.rows[n].dataItem===r)return n;return-1}return this.rows.length==1&&this.rows[0]instanceof t._NewRowTemplate?0:(n=this.selection.row,i=n>-1?this.rows[n]:null,i&&(i instanceof t.GroupRow||i.dataItem==null)?n:-1)}return this.selection.row},u.prototype._getCvIndex=function(n){if(n>-1&&this.collectionView){var t=this.rows[n].dataItem;for(n=Math.min(n,this.collectionView.items.length);n>-1;n--)if(this.collectionView.items[n]===t)return n}return-1},u.prototype._findRow=function(n){for(var t=0;t<this.rows.length;t++)if(this.rows[t].dataItem==n)return t;return-1},u.prototype._updateLayout=function(){var y=new n.CancelEventArgs,h,l,o,c;if(this.onUpdatingLayout(y)){var t=this._hdrVis&i.Row?this._hdrCols.getTotalSize():0,r=this._hdrVis&i.Column?this._hdrRows.getTotalSize():0,e=this._ftrRows.getTotalSize(),s=this._rows.getTotalSize()+e;s<1&&(s=1);this._rtl=this.hostElement?getComputedStyle(this.hostElement).direction=='rtl':!1;this._heightBrowser=Math.min(s,u._getMaxSupportedCssHeight());this._maxOffsetY=Math.max(0,s-this._heightBrowser);this.cells.hostElement&&(h=n.createElement('<div class="wj-cell"></div>',this.cells.hostElement),l=getComputedStyle(h),this._cellPadding=parseInt(this._rtl?l.paddingRight:l.paddingLeft),h.parentElement.removeChild(h));o=this._heightBrowser+r-e;this._rtl?(n.setCss(this._eTL,{right:0,top:0,width:t,height:r}),n.setCss(this._eCHdr,{right:t,top:0,height:r}),n.setCss(this._eRHdr,{right:0,top:r,width:t}),n.setCss(this._eCt,{right:t,top:r,width:this._gpCells.width,height:this._heightBrowser}),n.setCss(this._fCt,{right:t,top:r}),n.setCss(this._eBL,{right:0,top:o,width:t,height:e}),n.setCss(this._eCFtr,{right:t,top:o,height:e})):(n.setCss(this._eTL,{left:0,top:0,width:t,height:r}),n.setCss(this._eCHdr,{left:t,top:0,height:r}),n.setCss(this._eRHdr,{left:0,top:r,width:t}),n.setCss(this._eCt,{left:t,top:r,width:this._gpCells.width,height:this._heightBrowser}),n.setCss(this._fCt,{left:t,top:r}),n.setCss(this._eBL,{left:0,top:o,width:t,height:e}),n.setCss(this._eCFtr,{left:t,top:o,height:e}));this._stickyHdr&&this._updateStickyHeaders();var f=this._root,a=f.offsetWidth-f.clientWidth,v=f.offsetHeight-f.clientHeight;n.setCss(this._eSz,{width:t+a+this._gpCells.width,height:r+v+this._heightBrowser});c=null;this.columns._updateStarSizes(f.clientWidth-t)&&(c=f.clientWidth,n.setCss(this._eCt,{width:this._gpCells.width}));this._szClient=new n.Size(f.clientWidth-t,f.clientHeight-r);this._rcBounds=null;this._updateContent(!1);a=f.offsetWidth-f.clientWidth;v=f.offsetHeight-f.clientHeight;n.setCss(this._eSz,{width:t+a+this._gpCells.width,height:r+v+this._heightBrowser});this._szClient=new n.Size(f.clientWidth-t,f.clientHeight-r);c&&c!=f.clientWidth&&this.columns._updateStarSizes(f.clientWidth-t)&&(n.setCss(this._eCt,{width:this._gpCells.width}),this._updateContent(!1));n.setCss([this._eCHdr,this._eCFtr,this._fCt],{width:this._szClient.width});n.setCss([this._eRHdr,this._fCt],{height:this._szClient.height});e&&(o=Math.min(o,this._szClient.height+r-e),n.setCss([this._eBL,this._eCFtr],{top:o}));this.onUpdatedLayout(y)}},u.prototype._updateStickyHeaders=function(){var r=!1,o=0,f,t,i,e;if(this._stickyHdr){for(f=0,t=null,i=this.hostElement;i;i=i.parentElement)e=i.getBoundingClientRect(),t==null&&(t=e.top),f=Math.max(f,e.top);t=Math.max(0,f-t-1);o=-t;r=t>0}this._eTL.style.top=this._eCHdr.style.top=r?-o+'px':'';n.toggleClass(this._eTL,u._WJS_STICKY,r);n.toggleClass(this._eCHdr,u._WJS_STICKY,r)},u.prototype._updateScrollPosition=function(){var t=this._root,f=t.scrollTop,i=t.scrollLeft,r;return(this._rtl&&u._getRtlMode()=='rev'&&(i=t.scrollWidth-t.clientWidth-i),r=new n.Point(-Math.abs(i),-f),!this._ptScrl.equals(r))?(this._ptScrl=r,this.onScrollPositionChanged(),!0):!1},u.prototype._updateContent=function(t,r){var y=this,p=this.containsFocus(),w=n.contains(this.columnHeaders.hostElement,n.getActiveElement()),h=new n.CancelEventArgs,c,o,u,s,e;if(this.onUpdatingView(h)){if(this._offsetY=0,this._heightBrowser>this._szClient.height&&(c=Math.round(-this._ptScrl.y/(this._heightBrowser-this._szClient.height)*100)/100,this._offsetY=Math.round(this._maxOffsetY*c)),this._updateScrollPosition(),this._gpCells._updateContent(t,r,this._offsetY),this._hdrVis&i.Column&&(!r||this._ssHdr&i.Column)&&this._gpCHdr._updateContent(t,r,0),this._hdrVis&i.Row&&(!r||this._ssHdr&i.Row)&&this._gpRHdr._updateContent(t,r,this._offsetY),this._hdrVis&&!r&&this._gpTL._updateContent(t,r,0),this._gpCFtr.rows.length&&(this._gpBL._updateContent(t,r,0),this._gpCFtr._updateContent(t,r,0)),this.showMarquee)if(o=this._selHdl._sel,u=this._eMarquee,this.isRangeValid(o)){var f=this._getMarqueeRect(o),l=u.firstChild,a=u.offsetWidth-l.offsetWidth,v=u.offsetHeight-l.offsetHeight;n.setCss(u,{left:f.left+this.cells.hostElement.offsetLeft-a/2,top:f.top+this.cells.hostElement.offsetTop-v/2,width:f.width+a,height:f.height+v,visibility:f.width>0&&f.height>0?'':'collapse'})}else n.setCss(u,{left:0,top:0,width:0,height:0,visibility:'collapse'});if(n.isIE()&&(n.setText(this._fCt,null),!this.activeEditor&&(this.frozenRows||this.frozenColumns)))for(s=this._eCt.querySelectorAll('.wj-frozen'),e=0;e<s.length;e++)this._fCt.appendChild(s[e].cloneNode(!0));p&&!r&&setTimeout(function(){y.focus()},10);this._rcBounds=null;this.onUpdatedView(h)}},u.prototype._getMarqueeRect=function(i){var s=this.getMergedRange(this.cells,i.topRow,i.leftCol)||new t.CellRange(i.topRow,i.leftCol),h=this.getMergedRange(this.cells,i.bottomRow,i.rightCol)||new t.CellRange(i.bottomRow,i.rightCol),r=this.cells.getCellBoundingRect(s.topRow,s.leftCol,!0),f=this.cells.getCellBoundingRect(h.bottomRow,h.rightCol,!0),o,e,u;if(this.rows.frozen){if(o=Math.min(this.rows.length,this.rows.frozen),u=this.cells.getCellBoundingRect(o-1,0,!0),i.bottomRow>=o&&f.bottom<u.bottom)return new n.Rect(0,0,0,0);i.topRow>=o&&r.top<u.bottom&&(r.top=u.bottom)}if(this.columns.frozen)if(e=Math.min(this.columns.length,this.columns.frozen),u=this.cells.getCellBoundingRect(0,e-1,!0),this._rtl){if(i.rightCol>=e&&f.left>u.left)return new n.Rect(0,0,0,0);i.leftCol>=e&&r.right>u.left&&(r.left=u.left-r.width)}else{if(i.rightCol>=e&&f.right<u.right)return new n.Rect(0,0,0,0);i.leftCol>=e&&r.left<u.right&&(r.left=u.right)}return this._rtl?new n.Rect(f.left,r.top,r.right-f.left,f.bottom-r.top):new n.Rect(r.left,r.top,f.right-r.left,f.bottom-r.top)},u.prototype._bindColumns=function(){for(var i,r,e,f,o,u=0;u<this.columns.length;u++)i=this.columns[u],i._getFlag(t.RowColFlags.AutoGenerated)&&(this.columns.removeAt(u),u--);if(r=null,e=this.collectionView,e&&e.sourceCollection&&e.sourceCollection.length&&(r=e.sourceCollection[0]),r&&this.autoGenerateColumns)for(f in r)n.isPrimitive(r[f])&&(i=new t.Column,i._setFlag(t.RowColFlags.AutoGenerated,!0),i.binding=i.name=f,i.header=n.toHeaderCase(f),i.dataType=n.getType(r[f]),i.dataType==n.DataType.Number&&(i.width=80),o=Object.getOwnPropertyDescriptor(r,f),!o||o.writable||n.isFunction(o.set)||i._setFlag(t.RowColFlags.ReadOnly,!0),this.columns.push(i));this._updateColumnTypes()},u.prototype._updateColumnTypes=function(){var u=this.collectionView,f,r,i,t;if(n.hasItems(u))for(f=u.items[0],r=this.columns,i=0;i<r.length;i++)t=r[i],t.dataType==null&&t._binding&&(t.dataType=n.getType(t._binding.getValue(f)))},u.prototype._getBindingColumn=function(n,t,i){return i},u.prototype._bindRows=function(){var f=new n.CancelEventArgs,i,r,u,t;if(this.onLoadingRows(f)){if(this.rows.clear(),i=this.collectionView,i&&i.items)if(r=i.items,u=i.groups,this.childItemsPath)for(t=0;t<r.length;t++)this._addNode(r,t,0);else if(u!=null&&u.length>0&&this.showGroups)for(t=0;t<u.length;t++)this._addGroup(u[t]);else for(t=0;t<r.length;t++)this._addBoundRow(r,t);this.onLoadedRows(f)}},u.prototype._addBoundRow=function(n,i){this.rows.push(new t.Row(n[i]))},u.prototype._addNode=function(i,r,u){var e=new t.GroupRow,o=this.childItemsPath,c=n.isArray(o)?o[u]:o,h=i[r],s=h[c],f;if(e.dataItem=h,e.level=u,this.rows.push(e),s)for(f=0;f<s.length;f++)this._addNode(s,f,u+1)},u.prototype._addGroup=function(n){var r=new t.GroupRow,u,i;if(r.level=n.level,r.dataItem=n,this.rows.push(r),n.isBottomLevel)for(u=n.items,i=0;i<u.length;i++)this._addBoundRow(u,i);else for(i=0;i<n.groups.length;i++)this._addGroup(n.groups[i])},u._getSerializableProperties=function(n){var f=[],u,i,t,r;for(n=n.prototype;n!=Object.prototype;n=Object.getPrototypeOf(n))for(u=Object.getOwnPropertyNames(n),i=0;i<u.length;i++)t=u[i],r=Object.getOwnPropertyDescriptor(n,t),r&&r.set&&r.get&&t[0]!='_'&&!t.match(/disabled|required/)&&f.push(t);return f},u.prototype._copy=function(i,r){var f,u,e;if(i=='columns'){for(this.columns.clear(),f=n.asArray(r),u=0;u<f.length;u++)e=new t.Column,n.copy(e,f[u]),this.columns.push(e);return!0}return!1},u.prototype._isInputElement=function(n){if(n instanceof HTMLElement){var t=n.tagName.match(/INPUT|SELECT|TEXTAREA|BUTTON|A/);return t&&t.length>0}return!1},u._getMaxSupportedCssHeight=function(){var n;if(!u._maxCssHeight){var i=1e6,t=document.createElement('div');for(t.style.visibility='hidden',document.body.appendChild(t),n=i;n<=6e7;n+=5e5){if(t.style.height=n+'px',t.offsetHeight!=n)break;i=n}document.body.removeChild(t);u._maxCssHeight=i}return u._maxCssHeight},u._getRtlMode=function(){var t,i,r;return u._rtlMode||(t=n.createElement('<div dir="rtl" style="visibility:hidden;width:100px;height:100px;overflow:auto"><div style="width:2000px;height:2000px"><\/div><\/div>'),document.body.appendChild(t),i=t.scrollLeft,t.scrollLeft=-1e3,r=t.scrollLeft,document.body.removeChild(t),u._rtlMode=r<0?'neg':i>0?'rev':'std'),u._rtlMode},u._WJS_STICKY='wj-state-sticky',u._WJS_MEASURE='wj-state-measuring',u.controlTemplate='<div style="position:relative;width:100%;height:100%;overflow:hidden;max-width:inherit;max-height:inherit"><div wj-part="focus" tabIndex="0" style="position:absolute;opacity:0;pointer-events:none;left:-10px;top:-10px"><\/div><div wj-part="root" style="position:absolute;width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch;max-width:inherit;max-height:inherit;boxSizing:content-box"><div wj-part="cells" class="wj-cells" style="position:absolute"><\/div><div wj-part="marquee" class="wj-marquee" style="display:none;pointer-events:none"><div style="width:100%;height:100%"><\/div><\/div><\/div><div wj-part="fcells" style="position:absolute;pointer-events:none;overflow:hidden"><\/div><div wj-part="rh" style="position:absolute;overflow:hidden;outline:none"><div wj-part="rhcells" class="wj-rowheaders" style="position:relative"><\/div><\/div><div wj-part="cf" style="position:absolute;overflow:hidden;outline:none"><div wj-part="cfcells" class="wj-colfooters" style="position:relative"><\/div><\/div><div wj-part="ch" style="position:absolute;overflow:hidden;outline:none"><div wj-part="chcells" class="wj-colheaders" style="position:relative"><\/div><\/div><div wj-part="bl" style="position:absolute;overflow:hidden;outline:none"><div wj-part="blcells" class="wj-bottomleft" style="position:relative"><\/div><\/div><div wj-part="tl" style="position:absolute;overflow:hidden;outline:none"><div wj-part="tlcells" class="wj-topleft" style="position:relative"><\/div><\/div><div wj-part="sz" style="position:relative;visibility:hidden"><\/div><\/div>',u}(n.Control);t.FlexGrid=r})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(i){function r(r,u,f){i.call(this);this._p=n.asType(r,t.GridPanel);this._rng=n.asType(u,t.CellRange);this._data=f}return __extends(r,i),Object.defineProperty(r.prototype,"panel",{get:function(){return this._p},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"range",{get:function(){return this._rng.clone()},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"row",{get:function(){return this._rng.row},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"col",{get:function(){return this._rng.col},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"data",{get:function(){return this._data},set:function(n){this._data=n},enumerable:!0,configurable:!0}),r}(n.CancelEventArgs),r;t.CellRangeEventArgs=i;r=function(t){function i(i,r,u){t.call(this,i,r);this._cell=n.asType(u,HTMLElement)}return __extends(i,t),Object.defineProperty(i.prototype,"cell",{get:function(){return this._cell},enumerable:!0,configurable:!0}),i}(i);t.FormatItemEventArgs=r})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';(function(n){n[n.None=0]="None";n[n.Cell=1]="Cell";n[n.ColumnHeader=2]="ColumnHeader";n[n.RowHeader=3]="RowHeader";n[n.TopLeft=4]="TopLeft";n[n.ColumnFooter=5]="ColumnFooter";n[n.BottomLeft=6]="BottomLeft"})(t.CellType||(t.CellType={}));var i=t.CellType,r=function(){function r(i,u,f,e,o){this._offsetY=0;this._g=n.asType(i,t.FlexGrid);this._ct=n.asInt(u);this._rows=n.asType(f,t.RowCollection);this._cols=n.asType(e,t.ColumnCollection);this._e=n.asType(o,HTMLElement);this._rng=new t.CellRange;r._evtBlur||(r._evtBlur=document.createEvent('HTMLEvents'),r._evtBlur.initEvent('blur',!0,!1))}return Object.defineProperty(r.prototype,"grid",{get:function(){return this._g},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"cellType",{get:function(){return this._ct},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"viewRange",{get:function(){return this._getViewRange(!1)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"width",{get:function(){return this._cols.getTotalSize()},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._rows.getTotalSize()},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"rows",{get:function(){return this._rows},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"columns",{get:function(){return this._cols},enumerable:!0,configurable:!0}),r.prototype.getCellData=function(r,u,f){var s=this._rows[n.asNumber(r,!1,!0)],h,o=null,e,c,l,a;if(n.isString(u)&&(u=this._cols.indexOf(u),u<0))throw'Invalid column name or binding.';if(h=this._cols[n.asNumber(u,!1,!0)],e=this._g?this._g._getBindingColumn(this,r,h):h,!e.binding||!s.dataItem||s.dataItem instanceof n.collections.CollectionViewGroup?s._ubv&&(o=s._ubv[h._hash]):o=e._binding.getValue(s.dataItem),o==null)switch(this._ct){case i.ColumnHeader:(r==this._rows.length-1||e!=h)&&(o=e.header);break;case i.ColumnFooter:e.aggregate!=n.Aggregate.None&&s instanceof t.GroupRow&&(c=this._g.collectionView,c&&(l=n.tryCast(c,n.collections.CollectionView),o=l?l.getAggregate(e.aggregate,e.binding):n.getAggregate(e.aggregate,c.items,e.binding)));break;case i.Cell:e.aggregate!=n.Aggregate.None&&s instanceof t.GroupRow&&(a=n.tryCast(s.dataItem,n.collections.CollectionViewGroup),a&&(o=a.getAggregate(e.aggregate,e.binding,this._g.collectionView)))}return f&&(this.cellType==i.Cell&&e.dataMap&&(o=e.dataMap.getDisplayValue(o)),o=o!=null?n.Globalize.format(o,e.format):''),o},r.prototype.setCellData=function(t,r,u,f,e){var s,v,o,c,y,h,p,a,k;if(f===void 0&&(f=!0),e===void 0&&(e=!0),s=this._rows[n.asNumber(t,!1,!0)],n.isString(r)&&(r=this._cols.indexOf(r),r<0))throw'Invalid column name or binding.';if(v=this._cols[n.asNumber(r,!1,!0)],o=this._g?this._g._getBindingColumn(this,t,v):v,this._ct==i.Cell){if(o.dataMap&&u!=null&&(o.isRequired||u!=''&&u!=null))if(c=o.dataMap,y=c.getKeyValue(u),y==null){if(!c.isEditable||c.displayMemberPath!=c.selectedValuePath)return!1}else u=y;if(h=n.DataType.Object,o.dataType?h=o.dataType:(p=this.getCellData(t,r,!1),h=n.getType(p)),n.isBoolean(o.isRequired))if(o.isRequired||u!==''&&u!==null){if(o.isRequired&&(u===''||u===null))return!1}else u=null,f=!1;if(f&&(u=n.changeType(u,h,o.format),h!=n.DataType.Object&&n.getType(u)!=h))return!1}if(s.dataItem&&o.binding){var w=o._binding,l=s.dataItem,b=w.getValue(l);if(u!==b&&!n.DateTime.equals(u,b)&&(w.setValue(l,u),a=this._g.collectionView,a instanceof n.collections.CollectionView&&l!=a.currentEditItem)){k=new n.collections.NotifyCollectionChangedEventArgs(n.collections.NotifyCollectionChangedAction.Change,l,a.items.indexOf(l));a.onCollectionChanged(k)}}else s._ubv||(s._ubv={}),s._ubv[v._hash]=u;return e&&this._g&&this._g.invalidate(),!0},r.prototype.getCellBoundingRect=function(t,i,r){var o=this.rows[t],s=this.columns[i],u=new n.Rect(s.pos,o.pos,s.renderSize,o.renderSize),f,e;return this._g._rtl&&(u.left=this.hostElement.clientWidth-u.right,n.isIE()||(f=this.hostElement.parentElement,u.left-=f.offsetWidth-f.clientWidth)),r||(e=this.hostElement.getBoundingClientRect(),u.left+=e.left,u.top+=e.top-this._offsetY),t<this.rows.frozen&&(u.top-=this._g.scrollPosition.y),i<this.columns.frozen&&(u.left-=this._g.scrollPosition.x*(this._g._rtl?-1:1)),u},r.prototype.getSelectedState=function(n,r,u){var e=this._g,o=e.selectionMode,f=e._selHdl._sel;if(o!=t.SelectionMode.None)switch(this._ct){case i.Cell:if(u||(u=e.getMergedRange(this,n,r)),u){if(u.contains(f.row,f.col))return e.showMarquee?t.SelectedState.None:t.SelectedState.Cursor;if(u.intersects(f))return t.SelectedState.Selected}return f.row==n&&f.col==r?e.showMarquee?t.SelectedState.None:t.SelectedState.Cursor:e.rows[n].isSelected||e.columns[r].isSelected?t.SelectedState.Selected:(f=e._selHdl._adjustSelection(f),o==t.SelectionMode.ListBox)?t.SelectedState.None:f.containsRow(n)&&f.containsColumn(r)?t.SelectedState.Selected:t.SelectedState.None;case i.ColumnHeader:if(e.showSelectedHeaders&t.HeadersVisibility.Column&&(e.columns[r].isSelected||f.containsColumn(r)||f.intersectsColumn(u))&&(u&&(n=u.bottomRow),n==this.rows.length-1))return t.SelectedState.Selected;break;case i.RowHeader:if(e.showSelectedHeaders&t.HeadersVisibility.Row&&(e.rows[n].isSelected||f.containsRow(n)||f.intersectsRow(u))&&(u&&(r=u.rightCol),r==this.columns.length-1))return t.SelectedState.Selected}return t.SelectedState.None},Object.defineProperty(r.prototype,"hostElement",{get:function(){return this._e},enumerable:!0,configurable:!0}),r.prototype._getOffsetY=function(){return this._offsetY},r.prototype._updateContent=function(t,u,f){var e,o,y,p=this._g,c=this._rows,g=this._cols,l=this._ct,a,v,w,s,d,h;if((l==i.ColumnHeader||l==i.ColumnFooter||l==i.RowHeader)&&(a=p._ptScrl,v=this._e.style,l==i.RowHeader?v.top=a.y+'px':p._rtl?v.right=a.x+'px':v.left=a.x+'px'),this._offsetY!=f&&(t=!1,this._offsetY=f),w=this._getViewRange(!1),s=this._getViewRange(!0),!t||u||c.frozen||g.frozen||!this._rng.contains(w)){if(t&&s.equals(this._rng)||(u=!1),!t){var b=n.getActiveElement(),k=n.contains(this._e,b)?b:null,nt=this._g.cellFactory;for(h=0;h<this._e.childElementCount;h++)nt.disposeCell(this._e.children[h]);n.setText(this._e,null);k&&k.dispatchEvent(r._evtBlur);this._rowIdx=[]}for(t&&this._ct!=i.TopLeft&&this._reorderCells(s,this._rng),this._rng=s,o=0,this._rowIdx=[],e=s.topRow;e<=s.bottomRow&&e>-1;e++)this._rowIdx.push(o),o=this._renderRow(e,s,!1,u,o);for(this._rowIdx.push(o),e=s.topRow;e<=s.bottomRow&&e>-1;e++)o=this._renderRow(e,s,!0,u,o);for(e=0;e<c.frozen&&e<c.length;e++)o=this._renderRow(e,s,!1,u,o);for(e=0;e<c.frozen&&e<c.length;e++)o=this._renderRow(e,s,!0,u,o);for(d=this._e.childElementCount,h=o;h<d;h++)y=this._e.children[h],y.style.display='none'}},r.prototype._reorderCells=function(n,i){var h,r,s,c,f,l,e,o,u;if(this._rowIdx&&!(this._rows.frozen>0)&&!(this._cols.frozen>0)&&n.columnSpan==i.columnSpan&&n.rowSpan==i.rowSpan&&i.isValid&&n.isValid&&n.intersects(i)&&(n.row!=i.row&&(r=n.row-i.row,s=Math.max(1,n.rowSpan-1),r!=0&&Math.abs(r)<s&&(r>0&&(u=this._createRange(0,this._rowIdx[r]),this._e.appendChild(u.extractContents())),r<0&&(h=this._rowIdx.length-1,u=this._createRange(this._rowIdx[h+r],this._rowIdx[h]),this._e.insertBefore(u.extractContents(),this._e.firstChild)))),n.col!=i.col&&(r=n.col-i.col,s=Math.max(1,n.columnSpan-1),r!=0&&Math.abs(r)<s)))for(c=this._e.childElementCount,f=0;f<this._rowIdx.length-1;f++)l=this.rows[n.topRow+f],l instanceof t.GroupRow||(e=this._rowIdx[f],o=this._rowIdx[f+1],r>0&&e+r<=c&&(u=this._createRange(e,e+r),this._e.insertBefore(u.extractContents(),this._e.children[o])),r<0&&o+r-1>=0&&(u=this._createRange(o+r-1,o-1),this._e.insertBefore(u.extractContents(),this._e.children[e])))},r.prototype._createRange=function(n,t){var i=document.createRange();return i.setStart(this._e,n),i.setEnd(this._e,t),i},r.prototype._renderRow=function(n,t,i,r,u){var f;if(this.rows[n].renderSize<=0)return u;if(i)for(f=0;f<this.columns.frozen&&f<this.columns.length;f++)u=this._renderCell(n,f,t,r,u);else for(f=t.leftCol;f<=t.rightCol&&f>-1;f++)u=this._renderCell(n,f,t,r,u);return u},r.prototype._renderCell=function(i,r,u,f,e){var l=this._g,h=l.getMergedRange(this,i,r),s,o,c;if(h){for(s=Math.max(u.row,h.row);s<i;s++)if(this.rows[s].isVisible)return e;for(s=Math.max(u.col,h.col);s<r;s++)if(this.columns[s].isVisible)return e}return this.columns[r].renderSize<=0&&(!h||h.getRenderSize(this).width<=0)?e:(o=this._e.childNodes[e++],o&&f)?(c=this.getSelectedState(i,r,h),n.toggleClass(o,'wj-state-selected',c==t.SelectedState.Cursor),n.toggleClass(o,'wj-state-multi-selected',c==t.SelectedState.Selected),e):(o||(o=document.createElement('div'),o.tabIndex=0,this._e.appendChild(o)),l.cellFactory.updateCell(this,i,r,o,h),e)},r.prototype._getViewRange=function(n){var o=this._g,a=o._ptScrl,u=this._rows,f=this._cols,r=new t.CellRange(0,0,u.length-1,f.length-1),e,l;if(this._ct==i.Cell||this._ct==i.RowHeader){var h=-a.y+this._offsetY,v=o._szClient.height,s=Math.min(u.frozen,u.length-1);s>0&&(e=u[s-1].pos,h+=e,v-=e);r.row=Math.min(u.length-1,Math.max(u.frozen,u.getItemAt(h+1)));r.row2=u.getItemAt(h+v)}if(this._ct==i.Cell||this._ct==i.ColumnHeader){var c=-a.x,y=o._szClient.width,s=Math.min(f.frozen,f.length-1);s>0&&(e=f[s-1].pos,c+=e,y-=e);r.col=Math.min(f.length-1,Math.max(f.frozen,f.getItemAt(c+1)));r.col2=f.getItemAt(c+y)}return n&&this._ct==i.Cell&&(l=o.isTouching?6:1,r.row=Math.max(r.row-l,0),r.row2=Math.min(r.row2+l,u.length-1),r.col=Math.max(r.col-1,0),r.col2=Math.min(r.col2+1,f.length-1)),u.length<=u.frozen&&(r.row=r.row2=-1),f.length<=f.frozen&&(r.col=r.col2=-1),r},r.prototype._getFrozenPos=function(){var r=this._rows.frozen,u=this._cols.frozen,t=r>0?this._rows[r-1]:null,i=u>0?this._cols[u-1]:null,f=t?t.pos+t.renderSize:0,e=i?i.pos+i.renderSize:0;return new n.Point(e,f)},r}();t.GridPanel=r})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function i(){}return i.prototype.updateCell=function(r,u,f,e,o,s){var h=r.grid,y=r.cellType,k=r.rows,d=r.columns,p=k[u],g=d[f],tt=u,ut=f,w=n.tryCast(p,t.GroupRow),pt=n.tryCast(p,t._NewRowTemplate),wt=g.renderWidth,bt=p.renderHeight,a='wj-cell',l={display:''},kt=s!=!1,ht,et,nt,dt,lt,ot,v,at,vt,b,yt,it,st,rt,ti,gt,o,ni;s!=!1&&e.firstElementChild&&(e.childNodes.length!=1||e.firstElementChild.type!='checkbox')&&(n.setText(e,null),kt=!1);o&&!o.isSingleCell&&(u=o.row,f=o.col,tt=o.row2,ut=o.col2,p=k[u],g=d[f],w=n.tryCast(p,t.GroupRow),ht=o.getRenderSize(r),bt=ht.height,wt=ht.width);var c=h._getBindingColumn(r,u,g),ft=g.pos,ct=p.pos;n.isIE()&&y==t.CellType.Cell&&!h.editRange?(u<k.frozen&&f>=d.frozen&&(ft+=h._ptScrl.x),f<d.frozen&&u>=k.frozen&&(ct+=h._ptScrl.y)):(u<k.frozen&&(ct-=h._ptScrl.y),f<d.frozen&&(ft-=h._ptScrl.x));h._rtl?l.right=ft+'px':l.left=ft+'px';l.top=ct-r._getOffsetY()+'px';l.width=wt+'px';l.height=bt+'px';y==t.CellType.Cell?(w&&(a+=' wj-group'),h.showAlternatingRows&&u%2!=0&&(a+=' wj-alt'),(u<k.frozen||f<d.frozen)&&(a+=' wj-frozen'),pt&&(a+=' wj-new'),p.cssClass&&(a+=' '+p.cssClass),c.cssClass&&(a+=' '+c.cssClass)):(a+=' wj-header',h.showAlternatingRows&&u%2!=0&&(a+=' wj-header-alt'));et=r.getSelectedState(u,f,o);et!=t.SelectedState.None&&y==t.CellType.Cell&&g.dataType!=n.DataType.Boolean&&h.editRange&&h.editRange.contains(u,f)&&(et=t.SelectedState.None);switch(et){case t.SelectedState.Cursor:a+=' wj-state-selected';break;case t.SelectedState.Selected:a+=' wj-state-multi-selected'}if(tt==k.frozen-1&&(a+=' wj-frozen-row'),ut==d.frozen-1&&(a+=' wj-frozen-col'),(g.wordWrap||p.wordWrap)&&(a+=' wj-wrap'),kt&&a==e.className&&(nt=e.style,nt.top==l.top&&nt.width==l.width&&nt.height==l.height&&(h._rtl&&nt.right==l.right||!h._rtl&&nt.left==l.left))){nt.display&&(e.style.display='');return}l.textAlign=c.getAlignment();y==t.CellType.Cell&&h.rows.maxGroupLevel>-1&&(l.paddingLeft=l.paddingRight='',f==h.columns.firstVisibleIndex&&h.treeIndent&&(dt=w?Math.max(0,w.level):h.rows.maxGroupLevel+1,lt=h.treeIndent*dt+h._cellPadding,h._rtl?l.paddingRight=lt:l.paddingLeft=lt));s!=!1&&(ot=r.getCellData(u,f,!1),v=r.getCellData(u,f,!0),y==t.CellType.Cell&&f==h.columns.firstVisibleIndex&&w&&w.hasChildren&&!this._isEditingCell(h,u,f)?(v||(v=w.getGroupHeader()),e.innerHTML=this._getTreeIcon(w)+' '+v,l.textAlign=''):y==t.CellType.ColumnHeader&&c.currentSort&&h.showSort&&(tt==h._getSortRowIndex()||c!=g)?(a+=' wj-sort-'+(c.currentSort=='+'?'asc':'desc'),e.innerHTML=n.escapeHtml(v)+'&nbsp;'+this._getSortIcon(c)):y!=t.CellType.RowHeader||f!=h.rowHeaders.columns.length-1||v?y==t.CellType.Cell&&c.dataType==n.DataType.Boolean&&(!w||n.isBoolean(ot))?(b=e.firstChild,b instanceof HTMLInputElement&&b.type=='checkbox'||(e.innerHTML='<input type="checkbox"/>',b=e.firstChild),b.checked=ot==!0?!0:!1,b.indeterminate=ot==null,b.disabled=!h._edtHdl._allowEditing(u,f),b.disabled&&(b.style.cursor='default'),h.editRange&&h.editRange.contains(u,f)&&(h._edtHdl._edt=b)):y==t.CellType.Cell&&this._isEditingCell(h,u,f)?(yt=c.inputType,c.inputType||(yt=c.dataType==n.DataType.Number&&!c.dataMap?'tel':'text'),c.dataMap||c.mask||(it=r.getCellData(u,f,!1),n.isNumber(it)&&(st=c.format,st&&it!=Math.round(it)&&(st=c.format.replace(/([a-z])(\d*)(.*)/ig,'$0112$3')),v=n.Globalize.formatNumber(it,st,!0))),e.innerHTML='<input type="'+yt+'" class="wj-grid-editor wj-form-control">',rt=e.children[0],rt.value=v,rt.style.textAlign=c.getAlignment(),l.padding='0px',c.mask&&(ti=new n._MaskProvider(rt,c.mask)),h._edtHdl._edt=rt):y==t.CellType.Cell&&(p.isContentHtml||c.isContentHtml)?e.innerHTML=v:n.setText(e,v):(at=h.collectionView,vt=at?at.currentEditItem:null,vt&&p.dataItem==vt?v='\u270E':n.tryCast(p,t._NewRowTemplate)&&(v='*'),n.setText(e,v)),y==t.CellType.Cell&&n.input&&c.dataMap&&c.showDropDown!==!1&&h._edtHdl._allowEditing(u,f)&&(i._ddIcon||(i._ddIcon=n.createElement('<div class="'+i._WJC_DROPDOWN+'"><span class="wj-glyph-down"></span></div>')),gt=i._ddIcon.cloneNode(!0),e.appendChild(gt)));switch(y){case t.CellType.RowHeader:e.removeAttribute('draggable');w||pt||(h.allowDragging&t.AllowDragging.Rows)==0||e.setAttribute('draggable','true');break;case t.CellType.ColumnHeader:e.removeAttribute('draggable');(h.allowDragging&t.AllowDragging.Columns)!=0&&e.setAttribute('draggable','true')}if(e.className!=a&&(e.className=a),n.setCss(e,l),h.itemFormatter&&h.itemFormatter(r,u,f,e),h.formatItem.hasHandlers){o=i._fmtRng;o?o.setRange(u,f,tt,ut):o=i._fmtRng=new t.CellRange(u,f,tt,ut);ni=new t.FormatItemEventArgs(r,o,e);h.onFormatItem(ni)}},i.prototype.disposeCell=function(){},i.prototype._isEditingCell=function(n,t,i){return n.editRange&&n.editRange.contains(t,i)},i.prototype._getTreeIcon=function(n){var t='wj-glyph-'+(n.isCollapsed?'':'down-')+(n.grid._rtl?'left':'right');return'<span class="'+i._WJC_COLLAPSE+' '+t+'"></span>'},i.prototype._getSortIcon=function(n){return'<span class="wj-glyph-'+(n.currentSort=='+'?'up':'down')+'"></span>'},i._WJC_COLLAPSE='wj-elem-collapse',i._WJC_DROPDOWN='wj-elem-dropdown',i}();t.CellFactory=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function t(n,t,i,r){n===void 0&&(n=-1);t===void 0&&(t=-1);i===void 0&&(i=n);r===void 0&&(r=t);this.setRange(n,t,i,r)}return t.prototype.setRange=function(t,i,r,u){t===void 0&&(t=-1);i===void 0&&(i=-1);r===void 0&&(r=t);u===void 0&&(u=i);this._row=n.asInt(t);this._col=n.asInt(i);this._row2=n.asInt(r);this._col2=n.asInt(u)},Object.defineProperty(t.prototype,"row",{get:function(){return this._row},set:function(t){this._row=n.asInt(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"col",{get:function(){return this._col},set:function(t){this._col=n.asInt(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"row2",{get:function(){return this._row2},set:function(t){this._row2=n.asInt(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"col2",{get:function(){return this._col2},set:function(t){this._col2=n.asInt(t)},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new t(this._row,this._col,this._row2,this._col2)},Object.defineProperty(t.prototype,"rowSpan",{get:function(){return Math.abs(this._row2-this._row)+1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"columnSpan",{get:function(){return Math.abs(this._col2-this._col)+1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"topRow",{get:function(){return Math.min(this._row,this._row2)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bottomRow",{get:function(){return Math.max(this._row,this._row2)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"leftCol",{get:function(){return Math.min(this._col,this._col2)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rightCol",{get:function(){return Math.max(this._col,this._col2)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isValid",{get:function(){return this._row>-1&&this._col>-1&&this._row2>-1&&this._col2>-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isSingleCell",{get:function(){return this._row==this._row2&&this._col==this._col2},enumerable:!0,configurable:!0}),t.prototype.contains=function(i,r){var u=n.tryCast(i,t);if(u)return u.topRow>=this.topRow&&u.bottomRow<=this.bottomRow&&u.leftCol>=this.leftCol&&u.rightCol<=this.rightCol;if(n.isInt(i)&&n.isInt(r))return i>=this.topRow&&i<=this.bottomRow&&r>=this.leftCol&&r<=this.rightCol;throw'contains expects a CellRange or row/column indices.';},t.prototype.containsRow=function(t){return n.asInt(t)>=this.topRow&&t<=this.bottomRow},t.prototype.containsColumn=function(t){return n.asInt(t)>=this.leftCol&&t<=this.rightCol},t.prototype.intersects=function(n){return this.intersectsRow(n)&&this.intersectsColumn(n)},t.prototype.intersectsRow=function(n){return n&&!(this.bottomRow<n.topRow||this.topRow>n.bottomRow)},t.prototype.intersectsColumn=function(n){return n&&!(this.rightCol<n.leftCol||this.leftCol>n.rightCol)},t.prototype.getRenderSize=function(t){var u=new n.Size(0,0),i,r;if(this.isValid){for(i=this.topRow;i<=this.bottomRow;i++)u.height+=t.rows[i].renderSize;for(r=this.leftCol;r<=this.rightCol;r++)u.width+=t.columns[r].renderSize}return u},t.prototype.equals=function(n){return n instanceof t&&this._row==n._row&&this._col==n._col&&this._row2==n._row2&&this._col2==n._col2},t}();t.CellRange=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i,u,r,e,o,f,s,h;(function(n){n[n.Visible=1]="Visible";n[n.AllowResizing=2]="AllowResizing";n[n.AllowDragging=4]="AllowDragging";n[n.AllowMerging=8]="AllowMerging";n[n.AllowSorting=16]="AllowSorting";n[n.AutoGenerated=32]="AutoGenerated";n[n.Collapsed=64]="Collapsed";n[n.ParentCollapsed=128]="ParentCollapsed";n[n.Selected=256]="Selected";n[n.ReadOnly=512]="ReadOnly";n[n.HtmlContent=1024]="HtmlContent";n[n.WordWrap=2048]="WordWrap";n[n.RowDefault=3]="RowDefault";n[n.ColumnDefault=23]="ColumnDefault"})(t.RowColFlags||(t.RowColFlags={}));i=t.RowColFlags;u=function(){function r(){this._list=null;this._pos=0;this._idx=-1}return Object.defineProperty(r.prototype,"visible",{get:function(){return this._getFlag(i.Visible)},set:function(n){this._setFlag(i.Visible,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isVisible",{get:function(){return this._getFlag(i.Visible)?this._getFlag(i.ParentCollapsed)&&!(this instanceof t._NewRowTemplate)?!1:!0:!1},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"pos",{get:function(){return this._list&&this._list._update(),this._pos},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"index",{get:function(){return this._list&&this._list._update(),this._idx},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"size",{get:function(){return this._sz},set:function(t){t!=this._sz&&(this._sz=n.asNumber(t,!0),this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"renderSize",{get:function(){if(!this.isVisible)return 0;var n=this._sz,t=this._list;return(n==null||n<0)&&t!=null?Math.round(t.defaultSize):(t!=null&&(t.minSize!=null&&n<t.minSize&&(n=t.minSize),t.maxSize!=null&&n>t.maxSize&&(n=t.maxSize)),this._szMin!=null&&n<this._szMin&&(n=this._szMin),this._szMax!=null&&n>this._szMax&&(n=this._szMax),Math.round(n))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"allowResizing",{get:function(){return this._getFlag(i.AllowResizing)},set:function(n){this._setFlag(i.AllowResizing,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"allowDragging",{get:function(){return this._getFlag(i.AllowDragging)},set:function(n){this._setFlag(i.AllowDragging,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"allowMerging",{get:function(){return this._getFlag(i.AllowMerging)},set:function(n){this._setFlag(i.AllowMerging,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isSelected",{get:function(){return this._getFlag(i.Selected)},set:function(n){if(this._setFlag(i.Selected,n,!0)){var t=this.grid;t&&t.refreshCells(!1,!0,!0)}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isReadOnly",{get:function(){return this._getFlag(i.ReadOnly)},set:function(n){this._setFlag(i.ReadOnly,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isContentHtml",{get:function(){return this._getFlag(i.HtmlContent)},set:function(n){this.isContentHtml!=n&&(this._setFlag(i.HtmlContent,n),this.grid&&this.grid.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"wordWrap",{get:function(){return this._getFlag(i.WordWrap)},set:function(n){this._setFlag(i.WordWrap,n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"cssClass",{get:function(){return this._cssClass},set:function(t){t!=this._cssClass&&(this._cssClass=n.asString(t),this.grid&&this.grid.invalidate(!1))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"grid",{get:function(){return this._list?this._list._g:null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"collectionView",{get:function(){return this.grid?this.grid.collectionView:null},enumerable:!0,configurable:!0}),r.prototype.onPropertyChanged=function(){this._list&&(this._list._dirty=!0,this.grid.invalidate())},r.prototype._getFlag=function(n){return(this._f&n)!=0},r.prototype._setFlag=function(n,t,i){return t!=this._getFlag(n)?(this._f=t?this._f|n:this._f&~n,i||this.onPropertyChanged(),!0):!1},r}();t.RowCol=u;r=function(r){function u(t){r.call(this);this._f=i.ColumnDefault;this._hash=u._ctr.toString(36);u._ctr++;t&&n.copy(this,t)}return __extends(u,r),Object.defineProperty(u.prototype,"name",{get:function(){return this._name},set:function(n){this._name=n},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"dataType",{get:function(){return this._type},set:function(t){this._type!=t&&(this._type=n.asEnum(t,n.DataType),this.grid&&this.grid.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isRequired",{get:function(){return this._required},set:function(t){this._required=n.asBoolean(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"required",{get:function(){return n._deprecated('required','isRequired'),this.isRequired},set:function(t){n._deprecated('required','isRequired');this.isRequired=t},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showDropDown",{get:function(){return this._showDropDown},set:function(t){t!=this._showDropDown&&(this._showDropDown=n.asBoolean(t,!0),this.grid&&this.grid.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"dropDownCssClass",{get:function(){return this._ddCssClass},set:function(t){this._ddCssClass=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"inputType",{get:function(){return this._inpType},set:function(t){this._inpType=n.asString(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"mask",{get:function(){return this._mask},set:function(t){this._mask=n.asString(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"binding",{get:function(){return this._binding?this._binding.path:null},set:function(t){var r,i,u;t!=this.binding&&(r=n.asString(t),this._binding=r?new n.Binding(r):null,!this._type&&this.grid&&this._binding&&(i=this.grid.collectionView,i&&i.sourceCollection&&i.sourceCollection.length&&(u=i.sourceCollection[0],this._type=n.getType(this._binding.getValue(u)))),this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"sortMemberPath",{get:function(){return this._bindingSort?this._bindingSort.path:null},set:function(t){if(t!=this.sortMemberPath){var i=n.asString(t);this._bindingSort=i?new n.Binding(i):null;this.onPropertyChanged()}},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"width",{get:function(){return this._szStar!=null?this._szStar:this.size},set:function(t){u._parseStarSize(t)!=null?(this._szStar=t,this.onPropertyChanged()):(this._szStar=null,this.size=n.asNumber(t,!0))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"minWidth",{get:function(){return this._szMin},set:function(t){t!=this._szMin&&(this._szMin=n.asNumber(t,!0,!0),this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"maxWidth",{get:function(){return this._szMax},set:function(t){t!=this._szMax&&(this._szMax=n.asNumber(t,!0,!0),this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"renderWidth",{get:function(){return this.renderSize},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"align",{get:function(){return this._align},set:function(n){this._align!=n&&(this._align=n,this.onPropertyChanged())},enumerable:!0,configurable:!0}),u.prototype.getAlignment=function(){var t=this._align;if(t==null&&(t='',!this._map))switch(this._type){case n.DataType.Boolean:t='center';break;case n.DataType.Number:t='right'}return t},Object.defineProperty(u.prototype,"header",{get:function(){return this._hdr?this._hdr:this.binding},set:function(n){this._hdr!=n&&(this._hdr=n,this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"dataMap",{get:function(){return this._map},set:function(i){this._map!=i&&(this._map&&this._map.mapChanged.removeHandler(this.onPropertyChanged,this),n.isArray(i)&&(i=new t.DataMap(i,null,null)),this._map=n.asType(i,t.DataMap,!0),this._map&&this._map.mapChanged.addHandler(this.onPropertyChanged,this),this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"format",{get:function(){return this._fmt},set:function(n){this._fmt!=n&&(this._fmt=n,this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"allowSorting",{get:function(){return this._getFlag(i.AllowSorting)},set:function(n){this._setFlag(i.AllowSorting,n)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"currentSort",{get:function(){var t,n;if(this.grid&&this.grid.collectionView&&this.grid.collectionView.canSort)for(t=this.grid.collectionView.sortDescriptions,n=0;n<t.length;n++)if(t[n].property==this._getBindingSort())return t[n].ascending?'+':'-';return null},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"aggregate",{get:function(){return this._agg!=null?this._agg:n.Aggregate.None},set:function(t){t!=this._agg&&(this._agg=n.asEnum(t,n.Aggregate),this.onPropertyChanged())},enumerable:!0,configurable:!0}),u.prototype._getBindingSort=function(){return this.sortMemberPath?this.sortMemberPath:this.binding?this.binding:null},u._parseStarSize=function(t){if(n.isString(t)&&t.length>0&&t[t.length-1]=='*'){var i=t.length==1?1:t.substr(0,t.length-1)*1;if(i>0&&!isNaN(i))return i}return null},u._ctr=0,u}(u);t.Column=r;e=function(n){function t(t){n.call(this);this._f=i.ColumnDefault;this._data=t}return __extends(t,n),Object.defineProperty(t.prototype,"dataItem",{get:function(){return this._data},set:function(n){this._data=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.size},set:function(n){this.size=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderHeight",{get:function(){return this.renderSize},enumerable:!0,configurable:!0}),t}(u);t.Row=e;o=function(r){function u(){r.call(this);this._level=-1;this.isReadOnly=!0}return __extends(u,r),Object.defineProperty(u.prototype,"level",{get:function(){return this._level},set:function(t){n.asInt(t);t!=this._level&&(this._level=t,this.onPropertyChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"hasChildren",{get:function(){if(this.grid!=null&&this._list!=null){this._list._update();var i=this.index<this._list.length-1?this._list[this.index+1]:null,r=n.tryCast(i,u),f=n.tryCast(i,t._NewRowTemplate);return i&&f==null&&(r==null||r.level>this.level)}return!0},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isCollapsed",{get:function(){return this._getFlag(i.Collapsed)},set:function(t){n.asBoolean(t);t!=this.isCollapsed&&this._list!=null&&this._setCollapsed(t)},enumerable:!0,configurable:!0}),u.prototype.getGroupHeader=function(){var u=this.grid,o=u.groupHeaderFormat?u.groupHeaderFormat:n.culture.FlexGrid.groupHeaderFormat,r=n.tryCast(this.dataItem,n.collections.CollectionViewGroup),s;if(r&&o){var f=r.groupDescription.propertyName,i=r.name,t=u.columns.getColumn(f),e=this.isContentHtml;return t&&(e=e||t.isContentHtml,t.header&&(f=t.header),t.dataMap?i=t.dataMap.getDisplayValue(i):t.format&&(i=n.Globalize.format(i,t.format))),s=r.getAggregate(n.Aggregate.CntAll,null,u.collectionView),n.format(o,{name:n.escapeHtml(f),value:e?i:n.escapeHtml(i),level:r.level,count:s})}return''},u.prototype._setCollapsed=function(r){var c=this,f=this.grid,o=f.rows,h=this.getCellRange(),s=new t.CellRangeEventArgs(f.cells,new t.CellRange(this.index,-1)),e;f.onGroupCollapsedChanging(s);if(!s.cancel){f.deferUpdate(function(){c._setFlag(i.Collapsed,r);for(var t=h.topRow+1;t<=h.bottomRow&&t>-1&&t<o.length;t++)o[t]._setFlag(i.ParentCollapsed,r),e=n.tryCast(o[t],u),e!=null&&e.isCollapsed&&(t=e.getCellRange().bottomRow)});f.onGroupCollapsedChanged(s)}},u.prototype.getCellRange=function(){for(var f,e=this._list,o=this.index,r=e.length-1,i=o+1;i<=r;i++)if(f=n.tryCast(e[i],u),f!=null&&f.level<=this.level){r=i-1;break}return new t.CellRange(o,0,r,this.grid.columns.length-1)},u}(e);t.GroupRow=o;f=function(i){function r(r,u){i.call(this);this._frozen=0;this._szDef=28;this._szTot=0;this._dirty=!1;this._g=n.asType(r,t.FlexGrid);this._szDef=n.asNumber(u,!1,!0)}return __extends(r,i),Object.defineProperty(r.prototype,"defaultSize",{get:function(){return this._szDef},set:function(t){this._szDef!=t&&(this._szDef=n.asNumber(t,!1,!0),this._dirty=!0,this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"frozen",{get:function(){return this._frozen},set:function(t){t!=this._frozen&&(this._frozen=n.asNumber(t,!1,!0),this._dirty=!0,this._g.invalidate())},enumerable:!0,configurable:!0}),r.prototype.isFrozen=function(n){return n<this.frozen},Object.defineProperty(r.prototype,"minSize",{get:function(){return this._szMin},set:function(t){t!=this._szMin&&(this._szMin=n.asNumber(t,!0,!0),this._dirty=!0,this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxSize",{get:function(){return this._szMax},set:function(t){t!=this._szMax&&(this._szMax=n.asNumber(t,!0,!0),this._dirty=!0,this._g.invalidate())},enumerable:!0,configurable:!0}),r.prototype.getTotalSize=function(){return this._update(),this._szTot},r.prototype.getItemAt=function(n){if(this._update(),n<=0&&this.length>0)return 0;for(var u=0,i=this.length-1,t,r;u<=i;)if(t=u+i>>>1,r=this[t],r._pos>n)i=t-1;else if(r._pos+r.renderSize<n)u=t+1;else{while(t>0&&!this[t].visible)t--;while(t<this.length-1&&!this[t].visible)t++;return t}return i},r.prototype.getNextCell=function(n,i,r){var u,f;switch(i){case t.SelMove.Next:for(u=n+1;u<this.length;u++)if(this[u].renderSize>0)return u;break;case t.SelMove.Prev:for(u=n-1;u>=0;u--)if(this[u].renderSize>0)return u;break;case t.SelMove.End:for(u=this.length-1;u>=0;u--)if(this[u].renderSize>0)return u;break;case t.SelMove.Home:for(u=0;u<this.length;u++)if(this[u].renderSize>0)return u;break;case t.SelMove.NextPage:return f=this.getItemAt(this[n].pos+r),f<0?this.getNextCell(n,t.SelMove.End,r):f;case t.SelMove.PrevPage:return f=this.getItemAt(this[n].pos-r),f<0?this.getNextCell(n,t.SelMove.Home,r):f}return n},r.prototype.canMoveElement=function(n,i){var u,f,r;if(i==n||n<0||n>=this.length||i>=this.length)return!1;for(i<0&&(i=this.length-1),u=Math.min(n,i),f=Math.max(n,i),r=u;r<=f;r++)if(!this[r].allowDragging)return!1;return this[i]instanceof t._NewRowTemplate?!1:!0},r.prototype.moveElement=function(n,t){if(this.canMoveElement(n,t)){var i=this[n];this.removeAt(n);t<0&&(t=this.length);this.insert(t,i)}},r.prototype.onCollectionChanged=function(t){t===void 0&&(t=n.collections.NotifyCollectionChangedEventArgs.reset);this._dirty=!0;this._g.invalidate();i.prototype.onCollectionChanged.call(this,t)},r.prototype.push=function(n){return n._list=this,i.prototype.push.call(this,n)},r.prototype.splice=function(n,t,r){return r&&(r._list=this),i.prototype.splice.call(this,n,t,r)},r.prototype.beginUpdate=function(){this._update();i.prototype.beginUpdate.call(this)},r.prototype._update=function(){var i,n,t;if(this._dirty&&!this.isUpdating){for(this._dirty=!1,i=0,t=0;t<this.length;t++)n=this[t],n._idx=t,n._list=this,n._pos=i,i+=n.renderSize;return this._szTot=i,!0}return!1},r}(n.collections.ObservableArray);t.RowColCollection=f;s=function(n){function t(){n.apply(this,arguments);this._firstVisible=-1}return __extends(t,n),t.prototype.getColumn=function(n){var t=this.indexOf(n);return t>-1?this[t]:null},t.prototype.indexOf=function(t){var i;if(t instanceof r)return n.prototype.indexOf.call(this,t);for(i=0;i<this.length;i++)if(this[i].name==t)return i;for(i=0;i<this.length;i++)if(this[i].binding==t)return i;return-1},Object.defineProperty(t.prototype,"firstVisibleIndex",{get:function(){return this._update(),this._firstVisible},enumerable:!0,configurable:!0}),t.prototype._update=function(){if(n.prototype._update.call(this)){this._firstVisible=-1;for(var t=0;t<this.length;t++)if(this[t].visible){this._firstVisible=t;break}return!0}return!1},t.prototype._updateStarSizes=function(n){for(var u,t,e=0,f,i=0;i<this.length;i++)t=this[i],t.isVisible&&(t._szStar?(e+=r._parseStarSize(t._szStar),f=t):n-=t.renderWidth);if(f){for(u=n,i=0;i<this.length;i++)t=this[i],t.isVisible&&t._szStar&&(t==f&&u>0?t._sz=u:(t._sz=Math.max(0,Math.round(r._parseStarSize(t._szStar)/e*n)),u-=t.renderWidth));return this._dirty=!0,this._update(),!0}return!1},t}(f);t.ColumnCollection=s;h=function(t){function i(){t.apply(this,arguments);this._maxLevel=-1}return __extends(i,t),Object.defineProperty(i.prototype,"maxGroupLevel",{get:function(){return this._update(),this._maxLevel},enumerable:!0,configurable:!0}),i.prototype._update=function(){var i,r;if(t.prototype._update.call(this)){for(this._maxLevel=-1,i=0;i<this.length;i++)r=n.tryCast(this[i],o),r&&r.level>this._maxLevel&&(this._maxLevel=r.level);return!0}return!1},i}(f);t.RowCollection=h})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(i){'use strict';var r=function(){function r(t,u){var f,s,l,a;if(this._row=-1,this._col=-1,this._edge=0,t instanceof i.FlexGrid)f=this._g=t;else if(t instanceof i.GridPanel)this._p=t,f=this._g=this._p.grid;else throw'First parameter should be a FlexGrid or GridPanel.';u=n.mouseToPage(u);this._pt=u.clone();var v=f.controlRect,y=f._szClient,nt=f.topLeftCells,tt=f._eTL,p=f.headersVisibility,w=i.HeadersVisibility,o=p&w.Row?nt.columns.getTotalSize():0,h=p&w.Column?nt.rows.getTotalSize():0,b=p&w.Column?h+tt.offsetTop:0,k=f._eBL,it=k.offsetHeight;if(u.x=Math.max(0,u.x-v.left),u.y=Math.max(0,u.y-v.top),this._g._rtl&&(u.x=v.width-u.x),!this._p&&u.x>=0&&u.y>=tt.offsetTop&&y&&u.x<=y.width+o&&u.y<=y.height+b&&(this._p=u.y<=b?u.x<=o?f.topLeftCells:f.columnHeaders:u.y<=k.offsetTop?u.x<=o?f.rowHeaders:f.cells:u.x<=o?f.bottomLeftCells:f.columnFooters),this._p!=null){var d=this._p.rows,g=this._p.columns,e=this._p.cellType,c=this._p._getFrozenPos(),rt=e==i.CellType.TopLeft||e==i.CellType.ColumnHeader?h:e==i.CellType.BottomLeft||e==i.CellType.ColumnFooter?it:d.getTotalSize(),ut=e==i.CellType.TopLeft||e==i.CellType.BottomLeft||e==i.CellType.RowHeader?o:g.getTotalSize();if(e==i.CellType.RowHeader||e==i.CellType.Cell?(u.y-=h,(u.y>c.y||c.y<=0)&&(u.y-=f._ptScrl.y,u.y+=this._p._getOffsetY())):(e==i.CellType.BottomLeft||e==i.CellType.ColumnFooter)&&(u.y-=k.offsetTop),(e==i.CellType.ColumnHeader||e==i.CellType.Cell||e==i.CellType.ColumnFooter)&&(u.x-=o,(u.x>c.x||c.x<=0)&&(u.x-=f._ptScrl.x)),(e==i.CellType.ColumnHeader||e==i.CellType.TopLeft)&&(u.y-=b-h),this._row=u.y>rt?-1:d.getItemAt(u.y),this._col=u.x>ut?-1:g.getItemAt(u.x),this._row<0||this._col<0){this._p=null;return}this._edge=0;s=r._SZEDGE[this._g.isTouching?1:0];this._col>-1&&(l=g[this._col],u.x-l.pos<=s&&(this._edge|=1),l.pos+l.renderSize-u.x<=s&&(this._edge|=4));this._row>-1&&(a=d[this._row],u.y-a.pos<=s&&(this._edge|=2),a.pos+a.renderSize-u.y<=s&&(this._edge|=8))}}return Object.defineProperty(r.prototype,"point",{get:function(){return this._pt},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"cellType",{get:function(){return this._p?this._p.cellType:t.CellType.None},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"panel",{get:function(){return this._p},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"row",{get:function(){return this._row},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"col",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"range",{get:function(){return new i.CellRange(this._row,this._col)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"edgeLeft",{get:function(){return(this._edge&1)!=0},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"edgeTop",{get:function(){return(this._edge&2)!=0},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"edgeRight",{get:function(){return(this._edge&4)!=0},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"edgeBottom",{get:function(){return(this._edge&8)!=0},enumerable:!0,configurable:!0}),r._SZEDGE=[5,30],r}();i.HitTestInfo=r})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';(function(n){n[n.None=0]="None";n[n.Cells=1]="Cells";n[n.ColumnHeaders=2]="ColumnHeaders";n[n.RowHeaders=4]="RowHeaders";n[n.AllHeaders=6]="AllHeaders";n[n.All=7]="All"})(t.AllowMerging||(t.AllowMerging={}));var i=t.AllowMerging,r=function(){function r(n){this._g=n}return r.prototype.getMergedRange=function(r,u,f,e){var c,g,b,v,y,nt,k,p,w;e===void 0&&(e=!0);var o,l,h=r.cellType,s=r.columns,a=r.rows,d=a[u],tt=s[f];if(d instanceof t._NewRowTemplate)return null;if(d instanceof t.GroupRow&&d.dataItem instanceof n.collections.CollectionViewGroup){if(o=new t.CellRange(u,f),tt.aggregate==n.Aggregate.None){while(o.col>0&&s[o.col-1].aggregate==n.Aggregate.None&&o.col!=s.frozen)o.col--;while(o.col2<s.length-1&&s[o.col2+1].aggregate==n.Aggregate.None&&o.col2+1!=s.frozen)o.col2++}while(o.col<f&&!s[o.col].visible)o.col++;return o.isSingleCell?null:o}c=!1;switch(this._g.allowMerging){case i.None:c=!0;break;case i.Cells:c=h!=t.CellType.Cell;break;case i.ColumnHeaders:c=h!=t.CellType.ColumnHeader&&h!=t.CellType.TopLeft;break;case i.RowHeaders:c=h!=t.CellType.RowHeader&&h!=t.CellType.TopLeft;break;case i.AllHeaders:c=h==t.CellType.Cell}if(c)return null;if(s[f].allowMerging){for(o=new t.CellRange(u,f),g=0,b=a.length-1,u>=a.frozen?e&&(h==t.CellType.Cell||h==t.CellType.RowHeader)&&(l=r._getViewRange(!0),g=l.topRow,b=l.bottomRow):b=a.frozen-1,v=u-1;v>=g&&this._mergeCell(r,v,f,u,f);v--)o.row=v;for(y=u+1;y<=b&&this._mergeCell(r,u,f,y,f);y++)o.row2=y;while(o.row<u&&!a[o.row].visible)o.row++;if(!o.isSingleCell)return o}if(a[u].allowMerging){for(o=new t.CellRange(u,f),nt=0,k=s.length-1,f>=s.frozen?e&&(h==t.CellType.Cell||h==t.CellType.ColumnHeader)&&(l=r._getViewRange(!0),nt=l.leftCol,k=l.rightCol):k=s.frozen-1,p=f-1;p>=nt&&this._mergeCell(r,u,p,u,f);p--)o.col=p;for(w=f+1;w<=k&&this._mergeCell(r,u,f,u,w);w++)o.col2=w;while(o.col<f&&!s[o.col].visible)o.col++;if(!o.isSingleCell)return o}return null},r.prototype._mergeCell=function(n,i,r,u,f){var e=n.rows[i],o=n.rows[u];return e instanceof t.GroupRow||e instanceof t._NewRowTemplate||o instanceof t.GroupRow||o instanceof t._NewRowTemplate?!1:i!=u&&n.rows.isFrozen(i)!=n.rows.isFrozen(u)?!1:r!=f&&n.columns.isFrozen(r)!=n.columns.isFrozen(f)?!1:i!=u&&(r>0&&(e.allowMerging&&this._mergeCell(n,i,r-1,i,r)||o.allowMerging&&this._mergeCell(n,u,r-1,u,r))||f<n.columns.length-1&&(e.allowMerging&&this._mergeCell(n,i,f,i,f+1)||o.allowMerging&&this._mergeCell(n,u,f,u,f+1)))?!1:n.getCellData(i,r,!0)!=n.getCellData(u,f,!0)?!1:!0},r}();t.MergeManager=r})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function t(t,i,r){var f,u;if(this.mapChanged=new n.Event,n.isArray(t)&&!i&&!r){for(f=[],u=0;u<t.length;u++)f.push({value:t[u]});t=f;i=r='value'}this._cv=n.asCollectionView(t);this._keyPath=n.asString(i,!1);this._displayPath=n.asString(r,!1);this._cv.collectionChanged.addHandler(this.onMapChanged,this)}return Object.defineProperty(t.prototype,"sortByDisplayValues",{get:function(){return this._sortByKey!=!0},set:function(t){this._sortByKey=!n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"collectionView",{get:function(){return this._cv},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedValuePath",{get:function(){return this._keyPath},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"displayMemberPath",{get:function(){return this._displayPath},enumerable:!0,configurable:!0}),t.prototype.getKeyValue=function(n){var t=this._indexOf(n,this._displayPath,!1);return t>-1?this._cv.sourceCollection[t][this._keyPath]:null},t.prototype.getDisplayValue=function(n){var t=this._indexOf(n,this._keyPath,!0);return t>-1?this._cv.sourceCollection[t][this._displayPath]:n},t.prototype.getDisplayValues=function(){var i=[],t,n;if(this._cv&&this._displayPath)for(t=this._cv.items,n=0;n<t.length;n++)i.push(t[n][this._displayPath]);return i},t.prototype.getKeyValues=function(){var i=[],t,n;if(this._cv&&this._keyPath)for(t=this._cv.items,n=0;n<t.length;n++)i.push(t[n][this._keyPath]);return i},Object.defineProperty(t.prototype,"isEditable",{get:function(){return this._editable},set:function(t){this._editable=n.asBoolean(t)},enumerable:!0,configurable:!0}),t.prototype.onMapChanged=function(n){this.mapChanged.raise(this,n)},t.prototype._indexOf=function(n,t,i){var u,r;if(this._cv&&t){var f=n!=null?n.toString():'',e=i?f:f.toLowerCase(),o=this._cv.sourceCollection;for(u=0;u<o.length;u++)if((r=o[u][t],r==n)||!i&&r.length==e.length&&r.toLowerCase()==e||r!=null&&r.toString()==f)return u}return-1},t}();t.DataMap=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var r,f,i,u;(function(n){n[n.None=0]="None";n[n.Cell=1]="Cell";n[n.CellRange=2]="CellRange";n[n.Row=3]="Row";n[n.RowRange=4]="RowRange";n[n.ListBox=5]="ListBox"})(t.SelectionMode||(t.SelectionMode={}));r=t.SelectionMode,function(n){n[n.None=0]="None";n[n.Selected=1]="Selected";n[n.Cursor=2]="Cursor"}(t.SelectedState||(t.SelectedState={}));f=t.SelectedState,function(n){n[n.None=0]="None";n[n.Next=1]="Next";n[n.Prev=2]="Prev";n[n.NextPage=3]="NextPage";n[n.PrevPage=4]="PrevPage";n[n.Home=5]="Home";n[n.End=6]="End";n[n.NextCell=7]="NextCell";n[n.PrevCell=8]="PrevCell"}(t.SelMove||(t.SelMove={}));i=t.SelMove;u=function(){function u(n){this._sel=new t.CellRange(0,0);this._mode=r.CellRange;this._g=n}return Object.defineProperty(u.prototype,"selectionMode",{get:function(){return this._mode},set:function(n){var u,i,f,e;if(n!=this._mode){if(n==r.ListBox||this._mode==r.ListBox)for(u=this._g.rows,i=0;i<u.length;i++)f=u[i],e=n==r.ListBox?this._sel.containsRow(i):!1,f._setFlag(t.RowColFlags.Selected,e,!0);switch(n){case r.None:this._sel.setRange(-1,-1);break;case r.Cell:this._sel.row2=this._sel.row;this._sel.col2=this._sel.col;break;case r.Row:this._sel.row2=this._sel.row}this._mode=n;this._g.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"selection",{get:function(){return this._sel},set:function(n){this.select(n)},enumerable:!0,configurable:!0}),u.prototype.select=function(i,u){var h,c,o,l;u===void 0&&(u=!0);n.isNumber(i)&&n.isNumber(u)&&(i=new t.CellRange(i,u),u=!0);i=n.asType(i,t.CellRange);var f=this._g,a=this._sel,e=i,s=!1;switch(f.selectionMode){case r.Cell:i.row2=i.row;i.col2=i.col;break;case r.Row:i.row2=i.row;break;case r.ListBox:s=!0}if(h=e.equals(a),s&&e.row>-1&&!f.rows[e.row].isSelected&&(h=!1),h){u&&f.scrollIntoView(e.row,e.col);return}if(c=new t.CellRangeEventArgs(f.cells,e),f.onSelectionChanging(c)){if(s){for(o=0;o<f.rows.length;o++)f.rows[o]._setFlag(t.RowColFlags.Selected,e.containsRow(o),!0);f.refreshCells(!1,!0,!0)}e.row=Math.min(e.row,f.rows.length-1);e.row2=Math.min(e.row2,f.rows.length-1);this._sel=e;f.refreshCells(!1,!0,!0);u&&f.scrollIntoView(e.row,e.col);f.collectionView&&(l=f._getCvIndex(e.row),f.collectionView.moveCurrentToPosition(l));f.onSelectionChanged(c)}},u.prototype.moveSelection=function(n,r,u){var e,f,h=this._g,l=h.rows,c=h.columns,o=this._getReferenceCell(n,r,u),s=Math.max(0,h._szClient.height-h.columnHeaders.height),a;r==i.NextCell?(f=c.getNextCell(o.col,i.Next,s),e=o.row,f==o.col&&(e=l.getNextCell(e,i.Next,s),e>o.row&&(f=c.getNextCell(0,i.Next,s),f=c.getNextCell(f,i.Prev,s))),h.select(e,f)):r==i.PrevCell?(f=c.getNextCell(o.col,i.Prev,s),e=o.row,f==o.col&&(e=l.getNextCell(e,i.Prev,s),e<o.row&&(f=c.getNextCell(c.length-1,i.Prev,s),f=c.getNextCell(f,i.Next,s))),h.select(e,f)):(e=l.getNextCell(o.row,n,s),f=c.getNextCell(o.col,r,s),u?(a=h._selHdl._sel,h.select(new t.CellRange(e,f,a.row2,a.col2))):h.select(e,f))},u.prototype._getReferenceCell=function(n,t){var f=this._g,u=f._selHdl._sel,r=f.getMergedRange(f.cells,u.row,u.col);if(!r||r.isSingleCell)return u;r=r.clone();switch(n){case i.Next:case i.NextCell:r.row=r.bottomRow;break;case i.None:r.row=u.row}switch(t){case i.Next:case i.NextCell:r.col=r.rightCol;break;case i.None:r.col=u.col}return r},u.prototype._adjustSelection=function(n){switch(this._mode){case r.Cell:return new t.CellRange(n.row,n.col,n.row,n.col);case r.Row:return new t.CellRange(n.row,0,n.row,this._g.columns.length-1);case r.RowRange:case r.ListBox:return new t.CellRange(n.row,0,n.row2,this._g.columns.length-1)}return n},u}();t._SelectionHandler=u})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function i(n){this._g=n;n.addEventListener(n.hostElement,'keypress',this._keypress.bind(this));n.addEventListener(n.hostElement,'keydown',this._keydown.bind(this))}return i.prototype._keydown=function(i){var r=this._g,e=r.selection,f=i.ctrlKey||i.metaKey,u=i.shiftKey,a=i.target,o=!0,v,l;if(r.isRangeValid(e)&&!i.defaultPrevented){if(!r.activeEditor&&r._isInputElement(a)&&!a.getAttribute('wj-part'))return;if(r.activeEditor&&r._edtHdl._keydown(i))return;var h=n.tryCast(r.rows[e.row],t.GroupRow),c=n.tryCast(r.collectionView,'IEditableCollectionView'),s=i.keyCode;if(r.autoClipboard){if(f&&(s==67||s==45)){if(l=new t.CellRangeEventArgs(r.cells,e),r.onCopying(l)){v=r.getClipString();n.Clipboard.copy(v);r.onCopied(l)}i.stopPropagation();return}if(f&&s==86||u&&s==45){r.isReadOnly||(l=new t.CellRangeEventArgs(r.cells,e),r.onPasting(l)&&n.Clipboard.paste(function(n){r.setClipString(n);r.onPasted(l)}));i.stopPropagation();return}}if(r._rtl)switch(s){case n.Key.Left:s=n.Key.Right;break;case n.Key.Right:s=n.Key.Left}switch(s){case 65:f?r.select(new t.CellRange(0,0,r.rows.length-1,r.columns.length-1)):o=!1;break;case n.Key.Left:e.isValid&&e.col==0&&h!=null&&!h.isCollapsed&&h.hasChildren?h.isCollapsed=!0:this._moveSel(t.SelMove.None,f?t.SelMove.Home:t.SelMove.Prev,u);break;case n.Key.Right:e.isValid&&e.col==0&&h!=null&&h.isCollapsed?h.isCollapsed=!1:this._moveSel(t.SelMove.None,f?t.SelMove.End:t.SelMove.Next,u);break;case n.Key.Up:if(i.altKey&&r._edtHdl._toggleListBox(this._g.selection))break;this._moveSel(f?t.SelMove.Home:t.SelMove.Prev,t.SelMove.None,u);break;case n.Key.Down:if(i.altKey&&r._edtHdl._toggleListBox(this._g.selection))break;this._moveSel(f?t.SelMove.End:t.SelMove.Next,t.SelMove.None,u);break;case n.Key.PageUp:this._moveSel(t.SelMove.PrevPage,t.SelMove.None,u);break;case n.Key.PageDown:this._moveSel(t.SelMove.NextPage,t.SelMove.None,u);break;case n.Key.Home:this._moveSel(f?t.SelMove.Home:t.SelMove.None,t.SelMove.Home,u);break;case n.Key.End:this._moveSel(f?t.SelMove.End:t.SelMove.None,t.SelMove.End,u);break;case n.Key.Tab:this._moveSel(t.SelMove.None,u?t.SelMove.PrevCell:t.SelMove.NextCell,!1);break;case n.Key.Enter:this._moveSel(u?t.SelMove.Prev:t.SelMove.Next,t.SelMove.None,!1);!u&&c&&c.currentEditItem!=null&&r._edtHdl._commitRowEdits();break;case n.Key.Escape:c&&(c.currentEditItem!=null&&c.cancelEdit(),c.currentAddItem!=null&&c.cancelNew());r._mouseHdl.resetMouseState();break;case n.Key.Delete:o=this._deleteSel();break;case n.Key.F2:o=r.startEditing(!0);break;case n.Key.F4:o=r._edtHdl._toggleListBox(this._g.selection);break;case n.Key.Space:o=r.startEditing(!0);o&&setTimeout(function(){var t=r.activeEditor;t&&(t.type=='checkbox'?(t.checked=!t.checked,r.finishEditing()):n.setSelectionRange(t,t.value.length))});break;default:o=!1}o&&(r.focus(),i.preventDefault(),i.stopPropagation())}},i.prototype._keypress=function(t){var i=this._g;i.activeEditor?i._edtHdl._keypress(t):t.charCode>n.Key.Space&&i.startEditing(!1)&&i.activeEditor&&setTimeout(function(){var r=i.activeEditor;r&&r.type!='checkbox'&&(r.value=String.fromCharCode(t.charCode),n.setSelectionRange(r,1),r.dispatchEvent(i._edtHdl._evtInput),i._edtHdl._keypress(t))});t.stopPropagation()},i.prototype._moveSel=function(n,i,r){this._g.selectionMode!=t.SelectionMode.None&&this._g._selHdl.moveSelection(n,i,r)},i.prototype._deleteSel=function(){var i=this._g,f=n.tryCast(i.collectionView,'IEditableCollectionView'),u=i.selection,o=i.rows,e=[],h,a,r,s,c,l;if(i.allowDelete&&!i.isReadOnly&&(f==null||f.canRemove&&!f.isAddingNew&&!f.isEditingItem))switch(i.selectionMode){case t.SelectionMode.CellRange:if(u.leftCol==0&&u.rightCol==i.columns.length-1)for(r=u.topRow;r>-1&&r<=u.bottomRow;r++)e.push(o[r]);break;case t.SelectionMode.ListBox:for(r=0;r<o.length;r++)o[r].isSelected&&e.push(o[r]);break;case t.SelectionMode.Row:u.topRow>-1&&e.push(o[u.topRow]);break;case t.SelectionMode.RowRange:for(r=u.topRow;r>-1&&r<=u.bottomRow;r++)e.push(o[r])}if(e.length>0){for(f&&f.beginUpdate(),i.beginUpdate(),h=new t.CellRange,a=new t.CellRangeEventArgs(i.cells,h),r=e.length-1;r>=0;r--)if(s=e[r],h.row=h.row2=s.index,i.onDeletingRow(a)){f&&s.dataItem?f.remove(s.dataItem):i.rows.removeAt(s.index);i.onDeletedRow(a)}return i.endUpdate(),f&&f.endUpdate(),i.selectionMode==t.SelectionMode.ListBox&&(c=i.selection.row,c>-1&&c<i.rows.length&&(i.rows[c].isSelected=!0)),i.childItemsPath&&i.collectionView&&i.collectionView.refresh(),!0}return!i.isReadOnly&&e.length==0&&u.isSingleCell&&(l=i._getBindingColumn(i.cells,u.row,i.columns[u.col]),(l.isRequired==!1||l.isRequired==null&&l.dataType==n.DataType.String)&&i.getCellData(u.row,u.col,!0)&&i.startEditing(!1,u.row,u.col))?(i.setCellData(u.row,u.col,'',!0),i.finishEditing(!0),i.invalidate(),!0):!1},i}();t._KeyboardHandler=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=4,r,e,u,f;(function(n){n[n.None=0]="None";n[n.Columns=1]="Columns";n[n.Rows=2]="Rows";n[n.Both=3]="Both";n[n.ColumnsAllCells=n.Columns|i]="ColumnsAllCells";n[n.RowsAllCells=n.Rows|i]="RowsAllCells";n[n.BothAllCells=n.Both|i]="BothAllCells"})(t.AllowResizing||(t.AllowResizing={}));r=t.AllowResizing,function(n){n[n.None=0]="None";n[n.Headers=1]="Headers";n[n.Cells=2]="Cells";n[n.Both=3]="Both"}(t.AutoSizeMode||(t.AutoSizeMode={}));e=t.AutoSizeMode,function(n){n[n.None=0]="None";n[n.Columns=1]="Columns";n[n.Rows=2]="Rows";n[n.Both=3]="Both"}(t.AllowDragging||(t.AllowDragging={}));u=t.AllowDragging;f=function(){function f(t){var r=this,i=t.hostElement,u,f;this._g=t;t.addEventListener(i,'mousedown',function(i){i.defaultPrevented||i.button!=0||n.closest(i.target,'.wj-flexgrid')==r._g.hostElement&&(t.addEventListener(document,'mousemove',u),t.addEventListener(document,'mouseup',f),r._mousedown(i))});u=function(n){r._mousemove(n)};f=function(n){t.removeEventListener(document,'mousemove');t.removeEventListener(document,'mouseup');r._mouseup(n)};t.addEventListener(i,'mousemove',this._hover.bind(this));t.addEventListener(i,'dblclick',this._dblclick.bind(this));t.addEventListener(i,'selectstart',function(n){n.target.tagName!='INPUT'&&n.preventDefault()});t.addEventListener(i,'wheel',function(i){var r=t.cells.hostElement.parentElement;r.scrollHeight>r.offsetHeight&&(i.deltaY<0&&r.scrollTop==0||i.deltaY>0&&r.scrollTop+r.offsetHeight>=r.scrollHeight)&&n.closest(i.target,'.wj-flexgrid')==t.hostElement&&(i.preventDefault(),i.stopPropagation())});t.addEventListener(i,'dragstart',this._dragstart.bind(this));t.addEventListener(i,'dragover',this._dragover.bind(this));t.addEventListener(i,'dragleave',this._dragover.bind(this));t.addEventListener(i,'drop',this._drop.bind(this));t.addEventListener(i,'dragend',this._dragend.bind(this));this._dvMarker=n.createElement('<div class="wj-marker">&nbsp;</div>')}return f.prototype.resetMouseState=function(){var n,t;this._dragSource&&(this._dragSource.style.opacity=1);this._showDragMarker(null);n=this._g.hostElement;n&&(n.style.cursor='default');t=this._g;t.removeEventListener(document,'mousemove');t.removeEventListener(document,'mouseup');this._htDown=null;this._lbSelRows=null;this._szRowCol=null;this._szArgs=null;this._dragSource=null},f.prototype._mousedown=function(i){var r=this._g,f,o,s,e,h;if(r._rcBounds=null,f=r.hitTest(i),o=f.cellType,o==t.CellType.None){r.finishEditing();return}if((o!=t.CellType.Cell||!r.editRange||!r.editRange.contains(f.range))&&(s=n.getActiveElement(),i.target!=s||!r._isInputElement(i.target))){if(i.target!=s&&r.focus(),this._htDown=f,this._eMouse=i,this._szRowCol!=null){this._handleResizing(i);return}switch(o){case t.CellType.Cell:i.ctrlKey&&r.selectionMode==t.SelectionMode.ListBox&&this._startListBoxSelection(f.row);this._mouseSelect(i,i.shiftKey);break;case t.CellType.RowHeader:(this._g.allowDragging&u.Rows)==0&&(i.ctrlKey&&r.selectionMode==t.SelectionMode.ListBox&&this._startListBoxSelection(f.row),this._mouseSelect(i,i.shiftKey))}if(o==t.CellType.Cell&&r.rows.maxGroupLevel>-1&&(e=n.tryCast(r.rows[f.row],t.GroupRow),h=n.closest(i.target,'.'+t.CellFactory._WJC_COLLAPSE),e&&h)){i.ctrlKey?r.collapseGroupsToLevel(e.isCollapsed?e.level+1:e.level):e.isCollapsed=!e.isCollapsed;this.resetMouseState();i.preventDefault();return}}},f.prototype._mousemove=function(n){var i=this;if(this._htDown!=null)if(setTimeout(function(){n.which&&i._g.containsFocus()||i.resetMouseState()}),this._eMouse=n,this._szRowCol)this._handleResizing(n);else switch(this._htDown.cellType){case t.CellType.Cell:this._mouseSelect(n,!0);break;case t.CellType.RowHeader:(this._g.allowDragging&u.Rows)==0&&this._mouseSelect(n,!0)}},f.prototype._mouseup=function(n){var i,r,u,f;this._dragSource&&this._g.isTouching||(i=this._htDown,!i||i.cellType!=t.CellType.TopLeft||this._szArgs||n.defaultPrevented?this._szArgs?this._finishResizing(n):this._handleSort(n):(r=this._g,u=r.hitTest(n),u.panel==i.panel&&u.row==i.row&&u.col==i.col&&(f=r.getMergedRange(i.panel,i.row,i.col)||u.range,f.row==0&&f.col==0&&r.select(new t.CellRange(0,0,r.rows.length-1,r.columns.length-1)))),this.resetMouseState())},f.prototype._dblclick=function(n){var u=this._g,e=u.hitTest(n),o=e.cellType,l=u.selection,s=e.range,f,h,c;if(!n.defaultPrevented){if(e.edgeRight&&u.allowResizing&r.Columns){if(o==t.CellType.ColumnHeader||o==t.CellType.Cell&&u.allowResizing&i){for(n.preventDefault(),n.ctrlKey&&l.containsColumn(e.col)&&(s=l),h=s.leftCol;h<=s.rightCol;h++)if(u.columns[h].allowResizing&&(f=new t.CellRangeEventArgs(u.cells,new t.CellRange(-1,h)),u.onAutoSizingColumn(f)&&u.onResizingColumn(f))){u.autoSizeColumn(h);u.onResizedColumn(f);u.onAutoSizedColumn(f)}}else if(o==t.CellType.TopLeft&&u.topLeftCells.columns[e.col].allowResizing&&(n.preventDefault(),f=new t.CellRangeEventArgs(u.topLeftCells,new t.CellRange(-1,e.col)),u.onAutoSizingColumn(f)&&u.onResizingColumn(f))){u.autoSizeColumn(e.col,!0);u.onAutoSizedColumn(f);u.onResizedColumn(f)}this.resetMouseState();return}if(e.edgeBottom&&u.allowResizing&r.Rows){if(o==t.CellType.RowHeader||o==t.CellType.Cell&&u.allowResizing&i){for(n.ctrlKey&&l.containsRow(e.row)&&(s=l),c=s.topRow;c<=s.bottomRow;c++)if(u.rows[c].allowResizing&&(f=new t.CellRangeEventArgs(u.cells,new t.CellRange(c,-1)),u.onAutoSizingRow(f)&&u.onResizingRow(f))){u.autoSizeRow(c);u.onResizedRow(f);u.onAutoSizedRow(f)}}else if(o==t.CellType.TopLeft&&u.topLeftCells.rows[e.row].allowResizing&&(f=new t.CellRangeEventArgs(u.topLeftCells,new t.CellRange(e.row,-1)),u.onAutoSizingRow(f)&&u.onResizingRow(f))){u.autoSizeRow(e.row,!0);u.onResizedRow(f);u.onAutoSizedRow(f)}this.resetMouseState()}}},f.prototype._hover=function(n){if(this._htDown==null){var u=this._g,f=u.hitTest(n),s=f.panel,e=f.cellType,o='default';this._szRowCol=null;(e==t.CellType.ColumnHeader||e==t.CellType.TopLeft||e==t.CellType.Cell&&u.allowResizing&i)&&f.edgeRight&&(u.allowResizing&r.Columns)!=0&&(this._szRowCol=this._getResizeCol(f));(e==t.CellType.RowHeader||e==t.CellType.TopLeft||e==t.CellType.Cell&&u.allowResizing&i)&&f.edgeBottom&&(u.allowResizing&r.Rows)!=0&&(this._szRowCol=this._getResizeRow(f));this._szRowCol instanceof t.Column?o='col-resize':this._szRowCol instanceof t.Row&&(o='row-resize');this._szStart=this._szRowCol?this._szRowCol.renderSize:0;u.hostElement.style.cursor=o}},f.prototype._getResizeCol=function(n){for(var i,r=n.panel.columns,f=r[n.col],u=n.col+1;u<r.length;u++)if(i=r[u],i.visible){i.size<1&&(f=i);break}if(n.col==r.length-1&&(n.cellType==t.CellType.TopLeft||n.cellType==t.CellType.RowHeader))for(r=this._g.columns,u=0;u<r.length;u++)if(i=r[u],i.visible){i.size<1&&(f=i);break}return f.allowResizing?f:null},f.prototype._getResizeRow=function(n){for(var i,r=n.panel.rows,f=r[n.row],u=n.row+1;u<r.length;u++)if(i=r[u],i.visible){i.size<1&&(f=i);break}if(n.row==r.length-1&&(n.cellType==t.CellType.TopLeft||n.cellType==t.CellType.ColumnHeader))for(r=this._g.rows,u=0;u<r.length;u++)if(i=r[u],i.visible){i.size<1&&(f=i);break}return f.allowResizing?f:null},f.prototype._mouseSelect=function(i,r){var f=this,u;this._htDown&&this._htDown.panel&&this._g.selectionMode!=t.SelectionMode.None&&(u=new t.HitTestInfo(this._htDown.panel,i),this._handleSelection(u,r),this._g._isInputElement(i.target)||i.preventDefault(),!n.isIE9()&&i.button>=0&&(u=new t.HitTestInfo(this._g,i),u.cellType!=t.CellType.Cell&&u.cellType!=t.CellType.RowHeader&&setTimeout(function(){f._mouseSelect(f._eMouse,r)},100)))},f.prototype._handleResizing=function(n){var u;if(n.preventDefault(),this._szRowCol instanceof t.Column){var i=this._g,e=n.clientX+pageXOffset,r=Math.round(Math.max(f._SZ_MIN,this._szStart+(e-this._htDown.point.x)*(i._rtl?-1:1)));this._szRowCol.renderSize!=r&&(this._szArgs==null&&(u=i.rowHeaders.columns.indexOf(this._szRowCol)>-1?i.rowHeaders:i.cells,this._szArgs=new t.CellRangeEventArgs(u,new t.CellRange(-1,this._szRowCol.index))),this._szArgs.cancel=!1,i.onResizingColumn(this._szArgs)&&(i.deferResizing||i.isTouching?this._showResizeMarker(r):this._szRowCol.width=r))}if(this._szRowCol instanceof t.Row){var i=this._g,o=n.clientY+pageYOffset,r=Math.round(Math.max(f._SZ_MIN,this._szStart+(o-this._htDown.point.y)));this._szRowCol.renderSize!=r&&(this._szArgs==null&&(u=i.columnHeaders.rows.indexOf(this._szRowCol)>-1?i.columnHeaders:i.cells,this._szArgs=new t.CellRangeEventArgs(u,new t.CellRange(this._szRowCol.index,-1))),this._szArgs.cancel=!1,i.onResizingRow(this._szArgs)&&(i.deferResizing||i.isTouching?this._showResizeMarker(r):this._szRowCol.height=r))}},f.prototype._dragstart=function(n){var i=this._g,r=this._htDown,f,e;r&&(this._dragSource=null,this._szRowCol||(f=new t.CellRangeEventArgs(i.cells,r.range),r.cellType==t.CellType.ColumnHeader&&i.allowDragging&u.Columns&&r.col>-1&&i.columns[r.col].allowDragging?i.onDraggingColumn(f)&&(this._dragSource=n.target):r.cellType==t.CellType.RowHeader&&i.allowDragging&u.Rows&&r.row>-1&&i.rows[r.row].allowDragging&&(e=i.rows[r.row],e instanceof t.GroupRow||e instanceof t._NewRowTemplate||i.onDraggingRow(f)&&(this._dragSource=n.target))),this._dragSource&&n.dataTransfer?(n.dataTransfer.effectAllowed='move',n.dataTransfer.setData('text',''),this._dragSource.style.opacity=.5,n.stopPropagation(),i.beginUpdate()):n.preventDefault())},f.prototype._dragend=function(){this._g.endUpdate();this.resetMouseState()},f.prototype._dragover=function(n){var r=this._g,i=r.hitTest(n),u=!1;this._htDown&&i.cellType==this._htDown.cellType&&(i.cellType==t.CellType.ColumnHeader?u=r.columns.canMoveElement(this._htDown.col,i.col):i.cellType==t.CellType.RowHeader&&(u=r.rows.canMoveElement(this._htDown.row,i.row)));u?(n.dataTransfer.dropEffect='move',n.preventDefault(),this._showDragMarker(i)):this._showDragMarker(null)},f.prototype._drop=function(n){var i=this._g,r=i.hitTest(n),f=new t.CellRangeEventArgs(i.cells,r.range),u;if(this._htDown&&r.cellType==this._htDown.cellType)if(u=i.selection,r.cellType==t.CellType.ColumnHeader){i.columns.moveElement(this._htDown.col,r.col);i.select(u.row,r.col);i.onDraggedColumn(f)}else if(r.cellType==t.CellType.RowHeader){i.rows.moveElement(this._htDown.row,r.row);i.select(r.row,u.col);i.onDraggedRow(f)}this.resetMouseState()},f.prototype._showResizeMarker=function(i){var f=this._g,e=this._dvMarker,r,u;e.parentElement||f.cells.hostElement.appendChild(e);u=this._szArgs.panel.cellType;this._szRowCol instanceof t.Column?(r={display:'',left:this._szRowCol.pos+i-1,top:0,right:'',bottom:0,width:3,height:'',zIndex:1e3},f._rtl&&(r.left=e.parentElement.clientWidth-r.left-r.width),(u==t.CellType.TopLeft||u==t.CellType.RowHeader)&&(r.left-=f.topLeftCells.hostElement.offsetWidth)):(r={left:0,top:this._szRowCol.pos+i-1,right:0,bottom:'',width:'',height:3,zIndex:1e3},(u==t.CellType.TopLeft||u==t.CellType.ColumnHeader)&&(r.top-=f.topLeftCells.hostElement.offsetHeight));n.setCss(e,r)},f.prototype._showDragMarker=function(i){var f=this._g,u=this._dvMarker,r,e,o;if(!i){u.parentElement&&u.parentElement.removeChild(u);this._rngTarget=null;return}if(!i.range.equals(this._rngTarget)){this._rngTarget=i.range;u.parentElement||i.panel.hostElement.appendChild(u);r={display:'',left:0,top:0,width:6,height:6};switch(i.cellType){case t.CellType.ColumnHeader:r.height=i.panel.height;e=f.columns[i.col];r.left=e.pos-r.width/2;i.col>this._htDown.col&&(r.left+=e.renderWidth);f._rtl&&(r.left=u.parentElement.clientWidth-r.left-r.width);break;case t.CellType.RowHeader:r.width=i.panel.width;o=f.rows[i.row];r.top=o.pos-r.height/2;i.row>this._htDown.row&&(r.top+=o.renderHeight)}n.setCss(u,r)}},f.prototype._finishResizing=function(n){var r=this._g,s=r.selection,c=this._eMouse.ctrlKey,i=this._szArgs,l=n.clientX+pageXOffset,a=n.clientY+pageYOffset,u,h,e,o;if(i&&!i.cancel&&i.col>-1){u=i.col;h=Math.round(Math.max(f._SZ_MIN,this._szStart+(l-this._htDown.point.x)*(this._g._rtl?-1:1)));i.panel.columns[u].width=Math.round(h);r.onResizedColumn(i);if(c&&this._htDown.cellType==t.CellType.ColumnHeader&&s.containsColumn(u))for(e=s.leftCol;e<=s.rightCol;e++)if(r.columns[e].allowResizing&&e!=u&&(i=new t.CellRangeEventArgs(r.cells,new t.CellRange(-1,e)),r.onResizingColumn(i))){r.columns[e].size=r.columns[u].size;r.onResizedColumn(i)}}if(i&&!i.cancel&&i.row>-1){u=i.row;h=Math.round(Math.max(f._SZ_MIN,this._szStart+(a-this._htDown.point.y)));i.panel.rows[u].height=Math.round(h);r.onResizedRow(i);if(c&&this._htDown.cellType==t.CellType.RowHeader&&s.containsRow(u))for(o=s.topRow;o<=s.bottomRow;o++)if(r.rows[o].allowResizing&&o!=u&&(i=new t.CellRangeEventArgs(r.cells,new t.CellRange(o,-1)),r.onResizingRow(i))){r.rows[o].size=r.rows[u].size;r.onResizedRow(i)}}},f.prototype._startListBoxSelection=function(n){var i=this._g.rows,t;for(this._lbSelState=!i[n].isSelected,this._lbSelRows={},t=0;t<i.length;t++)i[t].isSelected&&(this._lbSelRows[t]=!0)},f.prototype._handleSelection=function(n,i){var r=this._g,o=r.rows,e=r._selHdl._sel,f=new t.CellRange(n.row,n.col),s,u,h,c;if(n.row>-1&&n.col>-1)if(this._lbSelRows!=null){for(s=!1,f=new t.CellRange(n.row,n.col,this._htDown.row,this._htDown.col),u=0;u<o.length;u++)if(h=f.containsRow(u)?this._lbSelState:this._lbSelRows[u]!=null,h!=o[u].isSelected&&(c=new t.CellRangeEventArgs(r.cells,new t.CellRange(u,e.col,u,e.col2)),r.onSelectionChanging(c))){o[u]._setFlag(t.RowColFlags.Selected,h,!0);s=!0;r.onSelectionChanged(c)}s&&r.refreshCells(!1,!0,!0);r.scrollIntoView(n.row,n.col)}else n.cellType==t.CellType.RowHeader&&(f.col=0,f.col2=r.columns.length-1),i&&(f.row2=e.row2,f.col2=e.col2),r.select(f)},f.prototype._handleSort=function(i){var u=this._g,o=u.collectionView,r=u.hitTest(i),s,a,h,e;if(this._htDown&&r.cellType==this._htDown.cellType&&r.col==this._htDown.col&&r.cellType==t.CellType.ColumnHeader&&!r.edgeRight&&r.col>-1&&o&&o.canSort&&u.allowSorting){var c=u.getMergedRange(r.panel,r.row,r.col),v=c?c.row2:r.row,l=u.columns[r.col],f=u._getBindingColumn(r.panel,r.row,l);if((v==u._getSortRowIndex()||l!=f)&&(s=f.currentSort,a=s!='+',f.allowSorting&&f.binding)){if(!s&&i.ctrlKey)return;if(h=new t.CellRangeEventArgs(u.columnHeaders,new t.CellRange(-1,r.col)),u.onSortingColumn(h)){e=o.sortDescriptions;i.ctrlKey?e.clear():e.splice(0,e.length,new n.collections.SortDescription(f._getBindingSort(),a));u.onSortedColumn(h)}}}},f._SZ_MIN=0,f}();t._MouseHandler=f})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function i(i){var r=this;this._fullEdit=!1;this._list=null;this._g=i;this._evtInput=document.createEvent('HTMLEvents');this._evtInput.initEvent('input',!0,!1);i.selectionChanging.addHandler(function(n,t){var u;if(r.finishEditing(),u=i._selHdl._sel.row,u!=t.row){var f=i.rows.length,e=u>-1&&u<f?i.rows[u].dataItem:null,o=t.row>-1&&t.row<f?i.rows[t.row].dataItem:null;e!=o&&r._commitRowEdits()}});i.lostFocus.addHandler(function(){if(!r._g.containsFocus()){var t=n.getActiveElement();t&&getComputedStyle(t).position=='fixed'||r._commitRowEdits()}});i.addEventListener(i.hostElement,'mousedown',function(u){var o,e,f,s;if(!u.defaultPrevented&&u.button==0&&!i._mouseHdl._szRowCol)if(o=i.selection,e=i.hitTest(u),r._htDown=null,r._cancelClick=!1,e.cellType!=t.CellType.Cell&&e.cellType!=t.CellType.None)r._lbx&&n.contains(r._lbx.hostElement,u.target)||r._commitRowEdits();else if(e.cellType!=t.CellType.None){if(f=n.tryCast(u.target,HTMLInputElement),f&&f.type=='checkbox'&&n.hasClass(f.parentElement,'wj-cell')&&(f!=r.activeEditor?(r.startEditing(!1,e.row,e.col),setTimeout(function(){f=r.activeEditor;f&&f.type=='checkbox'?(f.checked=!f.checked,f.focus(),r.finishEditing()):r._cancelClick=!0})):r.finishEditing()),s=document.elementFromPoint(u.clientX,u.clientY),n.closest(s,'.'+t.CellFactory._WJC_DROPDOWN)){r._toggleListBox(e.range);r._htDown=null;u.preventDefault();return}f==null&&e.row==o.row&&e.col==o.col&&(r._htDown=e)}},!0);i.addEventListener(i.hostElement,'click',function(n){if(r._cancelClick){n.preventDefault();n.stopPropagation();return}if(r._htDown&&!r.activeEditor){var t=i.hitTest(n);t.range.equals(r._htDown.range)&&r.startEditing(!0,t.row,t.col)}},!0)}return i.prototype.startEditing=function(i,r,u,f){var e,s,h,c,l,a,o;if((i===void 0&&(i=!0),e=this._g,r=n.asNumber(r,!0,!0),u=n.asNumber(u,!0,!0),r==null&&(r=e.selection.row),u==null&&(u=e.selection.col),f==null&&(f=!0),!this._allowEditing(r,u))||(s=e.getMergedRange(e.cells,r,u),s||(s=new t.CellRange(r,u)),h=e.rows[r].dataItem,e.select(s,!0),!e.rows[r]||h!=e.rows[r].dataItem))return!1;if(s.equals(this._rng))return!0;if(c=new t.CellRangeEventArgs(e.cells,s),!e.onBeginningEdit(c))return!1;if(l=n.tryCast(e.collectionView,'IEditableCollectionView'),l&&(h=e.rows[r].dataItem,l.editItem(h)),this._fullEdit=i,this._rng=s,this._list=null,a=e.columns[u].dataMap,a&&(this._list=a.getDisplayValues(h)),e.refresh(!1),o=this._edt,o){o.type=='checkbox'?this._fullEdit=!1:f&&n.setSelectionRange(o,0,o.value.length);e.onPrepareCellForEdit(c);o=this._edt;o&&f&&o.focus()}return!0},i.prototype.finishEditing=function(i){var u,h,l,o,s;if(i===void 0&&(i=!1),u=this._edt,!u)return this._removeListBox(),!0;var r=this._g,f=this._rng,e=new t.CellRangeEventArgs(r.cells,f),c=this._g.containsFocus();if(r.activeEditor&&c&&(h=n.Control.getControl(n.closest(n.getActiveElement(),'.wj-control')),h&&h!=this._g))h.onLostFocus(e);e.cancel=i;r.onCellEditEnding(e);if(!e.cancel)for(l=u.type=='checkbox'?u.checked:u.value,o=f.topRow;o<=f.bottomRow&&o<r.rows.length;o++)for(s=f.leftCol;s<=f.rightCol&&s<r.columns.length;s++)r.cells.setCellData(o,s,l,!0);this._edt=null;this._rng=null;this._list=null;this._removeListBox();r.refresh(!1);c&&r.focus();r.onCellEditEnded(e);return!0},Object.defineProperty(i.prototype,"activeEditor",{get:function(){return this._edt},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"editRange",{get:function(){return this._rng},enumerable:!0,configurable:!0}),i.prototype._allowEditing=function(n,i){var r=this._g;return r.isReadOnly||r.selectionMode==t.SelectionMode.None?!1:n<0||n>=r.rows.length||r.rows[n].isReadOnly||!r.rows[n].isVisible?!1:i<0||i>=r.columns.length||r.columns[i].isReadOnly||!r.columns[i].isVisible?!1:r._getBindingColumn(r.cells,n,r.columns[i]).isReadOnly?!1:!0},i.prototype._commitRowEdits=function(){var i,r,u;if(this.finishEditing(),i=this._g,r=n.tryCast(i.collectionView,'IEditableCollectionView'),r&&r.currentEditItem){u=new t.CellRangeEventArgs(i.cells,i.selection);i.onRowEditEnding(u);r.commitEdit();i.onRowEditEnded(u)}},i.prototype._keydown=function(t){switch(t.keyCode){case n.Key.F2:return this._fullEdit=!this._fullEdit,t.preventDefault(),!0;case n.Key.F4:return this._toggleListBox(this._g.selection),t.preventDefault(),!0;case n.Key.Space:var i=this._edt;return i&&i.type=='checkbox'&&(i.checked=!i.checked,this.finishEditing(),t.preventDefault()),!0;case n.Key.Enter:case n.Key.Tab:return this.finishEditing(),!1;case n.Key.Escape:return this.finishEditing(!0),!0;case n.Key.Up:case n.Key.Down:case n.Key.Left:case n.Key.Right:case n.Key.PageUp:case n.Key.PageDown:case n.Key.Home:case n.Key.End:if(this._lbx)return this._keydownListBox(t);if(t.altKey)switch(t.keyCode){case n.Key.Up:case n.Key.Down:return this._toggleListBox(this._g.selection),t.preventDefault(),!0}if(!this._fullEdit)return this.finishEditing(),!1}return!0},i.prototype._keydownListBox=function(t){var i=!0;if(this._lbx)switch(t.keyCode){case n.Key.Up:t.altKey?this._toggleListBox(this._g.selection):this._lbx.selectedIndex>0&&this._lbx.selectedIndex--;break;case n.Key.Down:t.altKey?this._toggleListBox(this._g.selection):this._lbx.selectedIndex++;break;case n.Key.Home:case n.Key.PageUp:this._lbx.selectedIndex=0;break;case n.Key.End:case n.Key.PageDown:this._lbx.selectedIndex=this._lbx.collectionView.items.length-1;break;default:i=!1}return i?(t.preventDefault(),!0):!1},i.prototype._keypress=function(t){var i=this._edt,f,u,r;if(i&&i.type!='checkbox'&&t.target==i&&this._list&&this._list.length>0&&t.charCode>=32)for(f=i.selectionStart,u=i.value.substr(0,f),t.target==i&&(f++,u+=String.fromCharCode(t.charCode)),u=u.toLowerCase(),r=0;r<this._list.length;r++)if(this._list[r].toLowerCase().indexOf(u)==0){i.value=this._list[r];n.setSelectionRange(i,f,this._list[r].length);i.dispatchEvent(this._evtInput);t.preventDefault();break}},i.prototype._toggleListBox=function(t){var i=this._g,r,u;return this._lbx&&(this._removeListBox(),i.selection.contains(t))?(i.activeEditor?i.activeEditor.focus():i.containsFocus()||i.focus(),!0):(r=i.isTouching,u=i._getBindingColumn(i.cells,t.row,i.columns[t.col]),!n.input||!u.dataMap||u.showDropDown===!1)?!1:!n.input||!this.startEditing(!0,t.row,t.col,!r)?!1:(this._lbx=this._createListBox(),this._lbx.showSelection(),r&&this._lbx.focus(),!0)},i.prototype._createListBox=function(){var u=this,t=this._g,r=this._rng,e=t.rows[r.row],o=t._getBindingColumn(t.cells,r.row,t.columns[r.col]),f=document.createElement('div'),i=new n.input.ListBox(f);return n.addClass(f,'wj-dropdown-panel'),i.maxHeight=e.renderHeight*4,i.itemsSource=o.dataMap.getDisplayValues(e.dataItem),i.selectedValue=t.activeEditor?t.activeEditor.value:t.getCellData(r.row,r.col,!0),n.addClass(f,o.dropDownCssClass),i.addEventListener(i.hostElement,'click',function(){u._removeListBox();u.finishEditing()}),i.lostFocus.addHandler(function(){u._removeListBox()}),i.selectedIndexChanged.addHandler(function(){var i=t.activeEditor;i&&(i.value=u._lbx.selectedValue,i.dispatchEvent(u._evtInput),n.setSelectionRange(i,0,i.value.length))}),n.showPopup(f,t.getCellBoundingRect(r.row,r.col)),i},i.prototype._removeListBox=function(){this._lbx&&(n.hidePopup(this._lbx.hostElement,!0),this._lbx.dispose(),this._lbx=null)},i}();t._EditHandler=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var r=function(){function r(n){this._nrt=new i;this._g=n;this._keydownBnd=this._keydown.bind(this);this._attach()}return Object.defineProperty(r.prototype,"newRowAtTop",{get:function(){return this._top},set:function(t){t!=this.newRowAtTop&&(this._top=n.asBoolean(t),this.updateNewRowTemplate())},enumerable:!0,configurable:!0}),r.prototype.updateNewRowTemplate=function(){var o=n.tryCast(this._g.collectionView,'IEditableCollectionView'),u=this._g,i=u.rows,s=o&&o.canAddNew&&u.allowAddNew&&!u.isReadOnly,r=i.indexOf(this._nrt),h=this._top?0:i.length-1,e=!1,f;!s&&r>-1?(f=u.selection,f.row==r&&u.select(f.row-1,f.col),i.removeAt(r)):s&&(r<0?e=!0:r!=h&&(i.removeAt(r),e=!0),e&&(this._top?i.insert(0,this._nrt):i.push(this._nrt)),this._nrt&&this._nrt._setFlag(t.RowColFlags.ParentCollapsed,!1))},r.prototype._attach=function(){var n=this._g;n&&(n.beginningEdit.addHandler(this._beginningEdit,this),n.pastingCell.addHandler(this._beginningEdit,this),n.rowEditEnded.addHandler(this._rowEditEnded,this),n.loadedRows.addHandler(this.updateNewRowTemplate,this),n.hostElement.addEventListener('keydown',this._keydownBnd,!0))},r.prototype._detach=function(){var n=this._g;n&&(n.beginningEdit.removeHandler(this._beginningEdit),n.pastingCell.removeHandler(this._beginningEdit),n.rowEditEnded.removeHandler(this._rowEditEnded),n.loadedRows.removeHandler(this.updateNewRowTemplate),n.hostElement.removeEventListener('keydown',this._keydownBnd,!0))},r.prototype._keydown=function(t){t.defaultPrevented||t.keyCode!=n.Key.Escape||this._g.activeEditor==null&&this._top&&this._nrt.dataItem&&(this._nrt.dataItem=null,this._g.invalidate())},r.prototype._beginningEdit=function(t,r){var e,u,f;if(!r.cancel&&(e=this._g.rows[r.row],n.tryCast(e,i)&&(u=n.tryCast(this._g.collectionView,'IEditableCollectionView'),u&&u.canAddNew)))if(this._top){if(this._nrt.dataItem==null){var f=null,o=u.sourceCollection,s=u.newItemCreator;f=n.isFunction(s)?s():o&&o.length?new o[0].constructor:{};this._nrt.dataItem=f}}else{f=u.currentAddItem&&u.currentAddItem==e.dataItem?u.currentAddItem:u.addNew();u.moveCurrentTo(f);this.updateNewRowTemplate();this._g.refresh(!0);this._g.onRowAdded(r);r.cancel&&u.cancelNew()}},r.prototype._rowEditEnded=function(t,i){var e=this,r=n.tryCast(this._g.collectionView,'IEditableCollectionView'),u=this._nrt.dataItem,o,f;if(r)if(r.isAddingNew)r.commitNew();else if(u&&!i.cancel){this._nrt.dataItem=null;o=r.addNew();for(f in u)o[f]=u[f];r.commitNew();setTimeout(function(){e._g.select(0,e._g.columns.firstVisibleIndex)},20)}},r}(),i;t._AddNewHandler=r;i=function(n){function t(){n.apply(this,arguments)}return __extends(t,n),t}(t.Row);t._NewRowTemplate=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={})),function(n){var t;(function(t){'use strict';var i=function(){function t(t){this._tbx=n.createElement('<input class="wj-grid-editor wj-form-control" wj-part="ime-target"/>');this._cssHidden={opacity:'0',pointerEvents:'none',position:'absolute',left:-10,top:-10,width:0};n.setCss(this._tbx,this._cssHidden);this._g=t;this._g.cells.hostElement.parentElement.appendChild(this._tbx);this._updateImeFocus();var t=this._g,i=t.hostElement;t.addEventListener(this._tbx,'compositionstart',this._compositionstart.bind(this));t.addEventListener(this._tbx,'keydown',this._keydown.bind(this));t.addEventListener(i,'blur',this._updateImeFocus.bind(this),!0);t.addEventListener(i,'focus',this._updateImeFocus.bind(this),!0);t.addEventListener(i,'mousedown',this._mousedown.bind(this),!0);t.addEventListener(i,'mouseup',this._mouseup.bind(this),!0);t.cellEditEnded.addHandler(this._cellEditEnded,this);t.selectionChanged.addHandler(this._updateImeFocus,this)}return t.prototype.dispose=function(){var n=this._g,t=n.hostElement;n.removeEventListener(this._tbx,'compositionstart');n.removeEventListener(t,'blur');n.removeEventListener(t,'focus');n.removeEventListener(t,'mousedown');n.removeEventListener(t,'mouseup');n.cellEditEnded.removeHandler(this._cellEditEnded);n.selectionChanged.removeHandler(this._updateImeFocus);this._tbx.parentElement&&this._tbx.parentElement.removeChild(this._tbx)},t.prototype._cellEditEnded=function(){n.setCss(this._tbx,this._cssHidden);this._tbx.value=''},t.prototype._compositionstart=function(){var t=this._g,i,r,u;t.activeEditor==null&&(i=t._selHdl.selection,t.startEditing(!1,i.row,i.col,!1)&&(r=t.getCellBoundingRect(i.row,i.col),u=t.cells.hostElement,n.setCss(this._tbx,{opacity:'',pointerEvents:'',left:t.columns[i.col].pos+u.offsetLeft,top:t.rows[i.row].pos+u.offsetTop,width:r.width-1,height:r.height-1}),t._edtHdl._edt=this._tbx))},t.prototype._keydown=function(t){switch(t.keyCode){case n.Key.Up:case n.Key.Down:case n.Key.PageUp:case n.Key.PageDown:this._g._keyHdl._keydown(t)}},t.prototype._mousedown=function(){this._mouseDown=!0;this._updateImeFocus()},t.prototype._mouseup=function(){this._mouseDown=!1;this._updateImeFocus()},t.prototype._updateImeFocus=function(){var i=this._g,t,r;!i.containsFocus()||i.activeEditor||i.isTouching||this._mouseDown||(t=this._tbx,this._enableIme()?(t.disabled=!1,t.select()):t.disabled||(t.disabled=!0,r=n.getActiveElement(),r instanceof HTMLElement&&r.blur(),i.focus()))},t.prototype._enableIme=function(){var i=this._g,t=i.selection;return t.row<0||t.col<0||!i._edtHdl._allowEditing(t.row,t.col)?!1:i.columns[t.col].dataType==n.DataType.Boolean?!1:!0},t}();t._ImeHandler=i})(t=n.grid||(n.grid={}))}(wijmo||(wijmo={}))
;
/*
    *
    * Wijmo Library 5.20162.207
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */

var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},wijmo;(function(n){var t;(function(t){'use strict';var i=function(t){function i(i){var r=this,o,u,f,e;t.call(this,i,null,!0);this._showBtn=!0;this._autoExpand=!0;this.textChanged=new n.Event;this.isDroppedDownChanging=new n.Event;this.isDroppedDownChanged=new n.Event;o=this.getTemplate();this.applyTemplate('wj-control wj-dropdown wj-content',o,{_tbx:'input',_btn:'btn',_dropDown:'dropdown'},'input');this._elRef=this._tbx;this._createDropDown();this._updateBtn();u=this._dropDown;u&&u.parentElement&&u.parentElement.removeChild(u);f=this._updateFocusState.bind(this);this.addEventListener(this.dropDown,'blur',f,!0);this.addEventListener(this.dropDown,'focus',f);e=this._keydown.bind(this);this.addEventListener(this.hostElement,'keydown',e);this.addEventListener(this.dropDown,'keydown',e);this.addEventListener(this._tbx,'keypress',function(n){n.keyCode==9787&&r._altDown&&n.preventDefault()});this.addEventListener(this._tbx,'input',function(){r._setText(r.text,!1)});this.addEventListener(this._tbx,'click',function(){r._autoExpand&&r._expandSelection()});n.isIE9()&&this.addEventListener(this._tbx,'keyup',function(){r._setText(r.text,!1)});this.addEventListener(this._btn,'click',this._btnclick.bind(this));this.addEventListener(this._dropDown,'click',function(n){n.stopPropagation()})}return __extends(i,t),Object.defineProperty(i.prototype,"text",{get:function(){return this._tbx.value},set:function(n){n!=this.text&&this._setText(n,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"inputElement",{get:function(){return this._tbx},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isReadOnly",{get:function(){return this._tbx.readOnly},set:function(t){this._tbx.readOnly=n.asBoolean(t);n.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isRequired",{get:function(){return this._tbx.required},set:function(t){this._tbx.required=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"required",{get:function(){return n._deprecated('required','isRequired'),this.isRequired},set:function(t){n._deprecated('required','isRequired');this.isRequired=t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"placeholder",{get:function(){return this._tbx.placeholder},set:function(n){this._tbx.placeholder=n},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isDroppedDown",{get:function(){return this._dropDown.style.display!='none'},set:function(t){if(t=n.asBoolean(t)&&!this.isDisabled&&!this.isReadOnly,t!=this.isDroppedDown&&this.onIsDroppedDownChanging(new n.CancelEventArgs)){var i=this._dropDown;t?(i.style.minWidth||(i.style.minWidth=this.hostElement.getBoundingClientRect().width+'px'),i.style.display='block',this._updateDropDown()):(this.containsFocus()&&(this.isTouching&&this.showDropDownButton?this.focus():this.selectAll()),n.hidePopup(i));this._updateFocusState();this.onIsDroppedDownChanged()}},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"dropDown",{get:function(){return this._dropDown},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"dropDownCssClass",{get:function(){return this._cssClass},set:function(t){t!=this._cssClass&&(n.removeClass(this._dropDown,this._cssClass),this._cssClass=n.asString(t),n.addClass(this._dropDown,this._cssClass))},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"showDropDownButton",{get:function(){return this._showBtn},set:function(t){this._showBtn=n.asBoolean(t);this._updateBtn()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"autoExpandSelection",{get:function(){return this._autoExpand},set:function(t){this._autoExpand=n.asBoolean(t)},enumerable:!0,configurable:!0}),i.prototype.selectAll=function(){this._elRef==this._tbx&&n.setSelectionRange(this._tbx,0,this.text.length)},i.prototype.onTextChanged=function(n){this._updateState();this.textChanged.raise(this,n)},i.prototype.onIsDroppedDownChanging=function(n){return this.isDroppedDownChanging.raise(this,n),!n.cancel},i.prototype.onIsDroppedDownChanged=function(t){var i=this;this.removeEventListener(document,'mousedown');this.removeEventListener(document,'keydown');this.isDroppedDown&&!this.containsFocus()&&(this.addEventListener(document,'mousedown',function(t){n.contains(i.dropDown,t.target)||n.contains(i.hostElement,t.target)||(i.isDroppedDown=!1)}),this.addEventListener(document,'keydown',function(){i.containsFocus()||(i.isDroppedDown=!1)}));this.isDroppedDownChanged.raise(this,t)},i.prototype.onGotFocus=function(n){this.isTouching||this.selectAll();t.prototype.onGotFocus.call(this,n)},i.prototype.onLostFocus=function(n){this._commitText();this.containsFocus()||(this.isDroppedDown=!1);t.prototype.onLostFocus.call(this,n)},i.prototype.containsFocus=function(){return t.prototype.containsFocus.call(this)||n.contains(this._dropDown,n.getActiveElement())},i.prototype.dispose=function(){this.isDroppedDown=!1;t.prototype.dispose.call(this)},i.prototype.refresh=function(i){if(i===void 0&&(i=!0),t.prototype.refresh.call(this,i),this.isDroppedDown&&getComputedStyle(this.hostElement).display!='none'){var r=n.getActiveElement();n.showPopup(this._dropDown,this.hostElement,!1,!1,this.dropDownCssClass==null);r instanceof HTMLElement&&r!=n.getActiveElement()&&r.focus()}},i.prototype._handleResize=function(){this.isDroppedDown&&this.refresh()},i.prototype._expandSelection=function(){var r=this._tbx,i=r.value,n=r.selectionStart,t=r.selectionEnd,u;if(i&&n==t&&(u=this._getCharType(i,n),u>-1)){for(;t<i.length;t++)if(this._getCharType(i,t)!=u)break;for(;n>0;n--)if(this._getCharType(i,n-1)!=u)break;n!=t&&r.setSelectionRange(n,t)}},i.prototype._getCharType=function(n,t){var i=n[t];return i>='0'&&i<='9'?0:i>='a'&&i<='z'||i>='A'&&i<='Z'?1:-1},i.prototype._keydown=function(t){if(!t.defaultPrevented){this._altDown=t.altKey;switch(t.keyCode){case n.Key.Tab:case n.Key.Escape:case n.Key.Enter:this.isDroppedDown&&(this.isDroppedDown=!1,t.keyCode==n.Key.Tab||this.containsFocus()||this.focus(),t.preventDefault());break;case n.Key.F4:case n.Key.Down:case n.Key.Up:(t.keyCode==n.Key.F4||t.altKey)&&n.contains(document.body,this.hostElement)&&(this.isDroppedDown=!this.isDroppedDown,this.isDroppedDown||this.focus(),t.preventDefault())}}},i.prototype._btnclick=function(){this.isDroppedDown=!this.isDroppedDown},i.prototype._setText=function(n){n==null&&(n='');n=n.toString();n!=this._tbx.value&&(this._tbx.value=n);n!=this._oldText&&(this._oldText=n,this.onTextChanged())},i.prototype._updateBtn=function(){this._btn.tabIndex=-1;this._btn.style.display=this._showBtn?'':'none'},i.prototype._createDropDown=function(){},i.prototype._commitText=function(){},i.prototype._updateDropDown=function(){this.isDroppedDown&&(this._commitText(),n.showPopup(this._dropDown,this.hostElement,!1,!1,this.dropDownCssClass==null))},i.controlTemplate='<div style="position:relative" class="wj-template"><div class="wj-input"><div class="wj-input-group wj-input-btn-visible"><input wj-part="input" type="text" class="wj-form-control" /><span wj-part="btn" class="wj-input-group-btn" tabindex="-1"><button class="wj-btn wj-btn-default" type="button" tabindex="-1"><span class="wj-glyph-down"><\/span><\/button><\/span><\/div><\/div><div wj-part="dropdown" class="wj-content wj-dropdown-panel" style="display:none;position:absolute;z-index:100"><\/div><\/div>',i}(n.Control);t.DropDown=i})(t=n.input||(n.input={}))})(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';(function(n){n[n.None=0]="None";n[n.Day=1]="Day";n[n.Month=2]="Month"})(t.DateSelectionMode||(t.DateSelectionMode={}));var i=t.DateSelectionMode,r=function(r){function u(t,u){r.call(this,t);this._readOnly=!1;this._selMode=i.Day;this.valueChanged=new n.Event;this.displayMonthChanged=new n.Event;this.formatItem=new n.Event;this._value=n.DateTime.newDate();this._currMonth=this._getMonth(this._value);this._createChildren();this.refresh(!0);this.addEventListener(this.hostElement,'mouseup',this._click.bind(this));this.addEventListener(this.hostElement,'keydown',this._keydown.bind(this));this.initialize(u)}return __extends(u,r),Object.defineProperty(u.prototype,"value",{get:function(){return this._value},set:function(t){t=n.asDate(t,!0);t=this._clamp(t);this._valid(t)&&(this.displayMonth=this._getMonth(t),n.DateTime.equals(this._value,t)||(this._value=t,this.invalidate(!1),this.onValueChanged()))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"min",{get:function(){return this._min},set:function(t){t!=this.min&&(this._min=n.asDate(t,!0),this.refresh())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"max",{get:function(){return this._max},set:function(t){t!=this.max&&(this._max=n.asDate(t,!0),this.refresh())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"selectionMode",{get:function(){return this._selMode},set:function(t){var r,u;t!=this._selMode&&(this._selMode=n.asEnum(t,i),r=this._monthMode(),r&&(this.monthView=!1),u=this._btnMth.querySelector('.wj-glyph-down'),u&&(u.style.display=r?'none':''))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isReadOnly",{get:function(){return this._readOnly},set:function(t){this._readOnly=n.asBoolean(t);n.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"firstDayOfWeek",{get:function(){return this._fdw},set:function(t){if(t!=this._fdw){if(t=n.asNumber(t,!0),t&&(t>6||t<0))throw'firstDayOfWeek must be between 0 and 6 (Sunday to Saturday).';this._fdw=t;this.refresh()}},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"displayMonth",{get:function(){return this._currMonth},set:function(t){n.DateTime.equals(this.displayMonth,t)||(t=n.asDate(t),this._monthInValidRange(t)&&(this._currMonth=this._getMonth(t),this.invalidate(!0),this.onDisplayMonthChanged()))},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"showHeader",{get:function(){return this._tbHdr.style.display!='none'},set:function(t){this._tbHdr.style.display=n.asBoolean(t)?'':'none'},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"monthView",{get:function(){return this._tbMth.style.display!='none'},set:function(n){n!=this.monthView&&(this._tbMth.style.display=n?'':'none',this._tbYr.style.display=n?'none':'')},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"itemFormatter",{get:function(){return this._itemFormatter},set:function(t){t!=this._itemFormatter&&(this._itemFormatter=n.asFunction(t),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"itemValidator",{get:function(){return this._itemValidator},set:function(t){t!=this._itemValidator&&(this._itemValidator=n.asFunction(t),this.invalidate())},enumerable:!0,configurable:!0}),u.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},u.prototype.onDisplayMonthChanged=function(n){this.displayMonthChanged.raise(this,n)},u.prototype.onFormatItem=function(n){this.formatItem.raise(this,n)},u.prototype.refresh=function(i){var o,e,u,s,l,c,a,h,f;for(i===void 0&&(i=!0),s=this.displayMonth,l=this.firstDayOfWeek!=null?this.firstDayOfWeek:n.Globalize.getFirstDayOfWeek(),r.prototype.refresh.call(this,i),this._firstDay=n.DateTime.addDays(s,-(s.getDay()-l+7)%7),n.setText(this._spMth,n.Globalize.format(s,'y')),o=this._tbMth.querySelectorAll('td'),f=0;f<7&&f<o.length;f++)u=n.DateTime.addDays(this._firstDay,f),n.setText(o[f],n.Globalize.format(u,'ddd'));for(f=7;f<o.length;f++)if(e=o[f],u=n.DateTime.addDays(this._firstDay,f-7),n.setText(e,u.getDate().toString()),e.className='',c=!this._valid(u),n.toggleClass(e,'wj-state-invalid',c),n.toggleClass(e,'wj-state-selected',n.DateTime.sameDate(u,this.value)),n.toggleClass(e,'wj-day-today',n.DateTime.sameDate(u,new Date)),n.toggleClass(e,'wj-day-othermonth',c||u.getMonth()!=s.getMonth()||!this._inValidRange(u)),this.itemFormatter&&this.itemFormatter(u,e),this.formatItem.hasHandlers){a=new t.FormatItemEventArgs(f,u,e);this.onFormatItem(a)}for(h=this._tbMth.querySelectorAll('tr'),h.length&&(u=n.DateTime.addDays(this._firstDay,28),h[h.length-2].style.display=u.getMonth()==s.getMonth()?'':'none',u=n.DateTime.addDays(this._firstDay,35),h[h.length-1].style.display=u.getMonth()==s.getMonth()?'':'none'),o=this._tbYr.querySelectorAll('td'),o.length&&n.setText(o[0],s.getFullYear().toString()),f=1;f<o.length;f++)e=o[f],u=new Date(s.getFullYear(),f-1,1),n.setText(e,n.Globalize.format(u,'MMM')),e.className='',n.toggleClass(e,'wj-state-disabled',!this._monthInValidRange(u)),n.toggleClass(e,'wj-state-selected',this._sameMonth(u,this.value))},u.prototype._canChangeValue=function(){return!this._readOnly&&this._selMode!=i.None},u.prototype._valid=function(n){return this.itemValidator&&n?this.itemValidator(n):!0},u.prototype._inValidRange=function(t){return this.min&&t<n.DateTime.fromDateTime(this.min,t)?!1:this.max&&t>n.DateTime.fromDateTime(this.max,t)?!1:!0},u.prototype._monthInValidRange=function(t){var i=t.getFullYear(),r=t.getMonth(),u=new Date(i,r,1),f=n.DateTime.addDays(new Date(i,r+1),-1);return this._inValidRange(u)||this._inValidRange(f)},u.prototype._sameMonth=function(t,i){return n.isDate(t)&&n.isDate(i)&&t.getMonth()==i.getMonth()&&t.getFullYear()==i.getFullYear()},u.prototype._clamp=function(t){var i,r;return t&&(this.min&&(i=n.DateTime.fromDateTime(this.min,t),t<i&&(t=i)),this.max&&(r=n.DateTime.fromDateTime(this.max,t),t>r&&(t=r))),t},u.prototype._createChildren=function(){var f=this.getTemplate(),n,i,t,r,u;for(this.applyTemplate('wj-control wj-calendar',f,{_tbHdr:'tbl-header',_btnMth:'btn-month',_spMth:'span-month',_btnPrv:'btn-prev',_btnTdy:'btn-today',_btnNxt:'btn-next',_tbMth:'tbl-month',_tbYr:'tbl-year'}),n=this._createElement('tr',this._tbMth,'wj-header'),t=0;t<7;t++)this._createElement('td',n);for(i=0;i<6;i++)for(n=this._createElement('tr',this._tbMth),t=0;t<7;t++)this._createElement('td',n);for(n=this._createElement('tr',this._tbYr,'wj-header'),this._createElement('td',n).setAttribute('colspan','4'),r=0;r<3;r++)for(n=this._createElement('tr',this._tbYr),u=0;u<4;u++)this._createElement('td',n)},u.prototype._createElement=function(t,i,r){var u=document.createElement(t);return i&&i.appendChild(u),r&&n.addClass(u,r),u},u.prototype._click=function(t){var r=!1,i=t.target,f,u;n.contains(this._btnMth,i)&&!this._monthMode()?(this.monthView=!this.monthView,r=!0):n.contains(this._btnPrv,i)?(this._navigate(-1),r=!0):n.contains(this._btnNxt,i)?(this._navigate(1),r=!0):n.contains(this._btnTdy,i)&&(this._navigate(0),r=!0);i&&!r&&(i=n.closest(i,'TD'),i&&(this.monthView?(u=this._getCellIndex(this._tbMth,i),u>6&&this._canChangeValue()&&(f=n.DateTime.fromDateTime(n.DateTime.addDays(this._firstDay,u-7),this.value),this._inValidRange(f)&&this._valid(f)&&(this.value=f),r=!0)):(u=this._getCellIndex(this._tbYr,i),u>0&&(this.displayMonth=new Date(this.displayMonth.getFullYear(),u-1,1),this._monthMode()?this._canChangeValue()&&(this.value=n.DateTime.fromDateTime(this.displayMonth,this.value),this._inValidRange(f)&&(this.value=f)):this.monthView=!0,r=!0))));r&&(t.preventDefault(),this.focus())},u.prototype._getCellIndex=function(n,t){for(var r=n.querySelectorAll('TD'),i=0;i<r.length;i++)if(r[i]==t)return i;return-1},u.prototype._keydown=function(t){var u;if(!t.defaultPrevented&&!t.ctrlKey&&!t.shiftKey&&!t.altKey&&!t.metaKey){var r=0,i=0,f=!0;if(this.monthView)switch(t.keyCode){case n.Key.Left:r=-1;break;case n.Key.Right:r=1;break;case n.Key.Up:r=-7;break;case n.Key.Down:r=7;break;case n.Key.PageDown:i=1;break;case n.Key.PageUp:i=-1;break;default:f=!1}else switch(t.keyCode){case n.Key.Left:i=-1;break;case n.Key.Right:i=1;break;case n.Key.Up:i=-4;break;case n.Key.Down:i=4;break;case n.Key.PageDown:i=12;break;case n.Key.PageUp:i=-12;break;case n.Key.Enter:this._monthMode()?f=!1:this.monthView=!0;break;default:f=!1}this.value&&this._canChangeValue()&&(r||i)&&(u=this.value,u=n.DateTime.addDays(u,r),u=n.DateTime.addMonths(u,i),this.value=n.DateTime.fromDateTime(u,this.value));f&&t.preventDefault()}},u.prototype._getMonth=function(n){return n||(n=new Date),new Date(n.getFullYear(),n.getMonth(),1)},u.prototype._monthMode=function(){return this.selectionMode==i.Month},u.prototype._navigate=function(t){var r=this.monthView,i;switch(t){case 0:i=new Date;r?this._canChangeValue()&&(this.value=n.DateTime.fromDateTime(i,this.value)):this._monthMode()&&this._canChangeValue()&&(this.value=this._getMonth(i));this.displayMonth=this._getMonth(i);break;case 1:this.displayMonth=n.DateTime.addMonths(this.displayMonth,r?1:12);break;case-1:this.displayMonth=n.DateTime.addMonths(this.displayMonth,r?-1:-12)}},u.controlTemplate='<div class="wj-calendar-outer wj-content"><div wj-part="tbl-header" class="wj-calendar-header"><div wj-part="btn-month" class="wj-month-select"><span wj-part="span-month"><\/span> <span class="wj-glyph-down"><\/span><\/div><div class="wj-btn-group"><button type="button" wj-part="btn-prev" class="wj-btn wj-btn-default"><span class="wj-glyph-left"><\/span><\/button><button type="button" wj-part="btn-today" class="wj-btn wj-btn-default"><span class="wj-glyph-circle"><\/span><\/button><button type="button" wj-part="btn-next" class="wj-btn wj-btn-default"><span class="wj-glyph-right"><\/span><\/button><\/div><\/div><table wj-part="tbl-month" class="wj-calendar-month"/><table wj-part="tbl-year" class="wj-calendar-year" style="display:none"/><\/div>',u}(n.Control);t.Calendar=r})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(r,u){var e=this,f,o,s;t.call(this,r);this._hsb=[.5,1,1];this._alpha=1;this.valueChanged=new n.Event;f=this.getTemplate();this.applyTemplate('wj-control wj-colorpicker wj-content',f,{_eSB:'div-sb',_eHue:'div-hue',_eAlpha:'div-alpha',_ePreview:'div-pv',_ePal:'div-pal',_eText:'div-text'});this._palette='#FFF,#000, #F00,#FFC000,#FFFF00,#92D050,#00B050,#00B0F0,#0070C0,#7030A0'.split(',');this._updatePalette();this._eHue.style.backgroundImage='url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD4CAIAAACi6hsPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAGvSURBVDhPXdBPaM9xHMfxz4pWaxcmtoOhpdXSVpiyHWxqmVpDjaU5rK34XfypjTJ/p+ZPay6jhsOsRrKwaJElf9IQq03WIkv4FeMwMq221tfje1ByeFzfvd7PEKWGEKWTQRZLySWfVRRTQjmVbKWGOhLsZT+HaeY0bbTTQSfdXOcWffTzmAFeMcwoYyT5ygS/mA5hNgphip98J8kHRnnNSwZ4yH1uc4OrdHGR87RximYO0cgedlLLdqqoYAPrWMtKVrCcJSxiPmnMJUQp/Bsyk2xyyKOAQooopYwKtlDNDur5G7SBJo7RQiv/B+2hl3s84CkvGGKEOOYnxolj/mYmhBmDJ5ngCx95xxsGecYj4pB3iENeoZMO2mmlhaMcpIE4ZII6aqhmM3HMMkooopB88sghm0wySCeVlCjMCVFIYx4LWUwOeRSwhmLWU84mqqihll3sppEmjnOSs5zjEl1c4yZ99POE5wwxwns+840fTDFLFKaZZIJxkozxlmEGGSC+GF++Sy89dHOZC8Rr4lVnOMERDrCPBPXEX22jko2UEn+/mnxyWUYWC0gnNUQh/AEc0HJs6cex0gAAAABJRU5ErkJggg==)';this._eHue.style.backgroundSize='contain';navigator.appVersion.indexOf('MSIE 9')>-1&&(this._eSB.children[0].style.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffffff,endColorstr=#00ffffff,GradientType=1)',this._eSB.children[1].style.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#ff000000,GradientType=0)');f=i._tplCursor;this._cSB=n.createElement(f);this._cHue=n.createElement(f);this._cHue.style.width='100%';this._cAlpha=n.createElement(f);this._cAlpha.style.height='100%';this._eSB.appendChild(this._cSB);this._eHue.appendChild(this._cHue);this._eAlpha.appendChild(this._cAlpha);this.addEventListener(this.hostElement,'mousedown',function(n){document.addEventListener('mousemove',o);document.addEventListener('mouseup',s);e._mouseDown(n)});o=function(n){e._mouseMove(n)};s=function(n){document.removeEventListener('mousemove',o);document.removeEventListener('mouseup',s);e._mouseUp(n)};this.addEventListener(this.hostElement,'click',function(t){var i=t.target,r;i&&i.tagName=='DIV'&&n.contains(e._ePal,i)&&(r=i.style.backgroundColor,r&&(e.value=new n.Color(r).toString()))});this.value='#ffffff';this.initialize(u);this._updatePanels()}return __extends(i,t),Object.defineProperty(i.prototype,"showAlphaChannel",{get:function(){return this._eAlpha.parentElement.style.display!='none'},set:function(t){this._eAlpha.parentElement.style.display=n.asBoolean(t)?'':'none'},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"showColorString",{get:function(){return this._eText.style.display!='none'},set:function(t){this._eText.style.display=n.asBoolean(t)?'':'none'},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"value",{get:function(){return this._value},set:function(t){if(t!=this.value){this._value=n.asString(t);this._eText.innerText=this._value;var r=new n.Color(this._value),i=r.getHsb();(this._hsb[0]!=i[0]||this._hsb[1]!=i[1]||this._hsb[2]!=i[2]||this._alpha!=r.a)&&(i[2]==0?(i[0]=this._hsb[0],i[1]=this._hsb[1]):i[1]==0&&(i[0]=this._hsb[0]),this._hsb=i,this._alpha=r.a,this.onValueChanged())}},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"palette",{get:function(){return this._palette},set:function(t){var i,r;for(t=n.asArray(t),i=0;i<t.length&&i<this._palette.length;i++)r=n.asString(t[i]),this._palette[i]=r;this._updatePalette()},enumerable:!0,configurable:!0}),i.prototype.onValueChanged=function(n){this._updatePanels();this.valueChanged.raise(this,n)},i.prototype._mouseDown=function(n){this._htDown=this._getTargetPanel(n);this._htDown&&(n.preventDefault(),this.focus(),this._mouseMove(n))},i.prototype._mouseMove=function(t){if(this._htDown){var i=this._htDown.getBoundingClientRect();this._htDown==this._eHue?(this._hsb[0]=n.clamp((t.clientY-i.top)/i.height,0,.99),this._updateColor()):this._htDown==this._eSB?(this._hsb[1]=n.clamp((t.clientX-i.left)/i.width,0,1),this._hsb[2]=n.clamp(1-(t.clientY-i.top)/i.height,0,1),this._updateColor()):this._htDown==this._eAlpha&&(this._alpha=n.clamp((t.clientX-i.left)/i.width,0,1),this._updateColor())}},i.prototype._mouseUp=function(){this._htDown=null},i.prototype._updateColor=function(){var t=n.Color.fromHsb(this._hsb[0],this._hsb[1],this._hsb[2],this._alpha);this.value=t.toString();this._updatePanels()},i.prototype._updatePalette=function(){var o=new n.Color('#fff'),s=new n.Color('#000'),r,t,e;for(this._ePal.innerHTML='',r=0;r<this._palette.length;r++){var u=n.createElement('<div style="float:left;width:10%;box-sizing:border-box;padding:1px">'),i=new n.Color(this._palette[r]),f=i.getHsb();for(u.appendChild(this._makePalEntry(i,4)),t=0;t<5;t++)f[1]==0?(e=t*.1+(f[2]>.5?.05:.55),i=n.Color.interpolate(o,s,e)):i=n.Color.fromHsb(f[0],.1+t*.2,1-t*.1),u.appendChild(this._makePalEntry(i,0));this._ePal.appendChild(u)}},i.prototype._makePalEntry=function(t,i){var r=document.createElement('div');return n.setCss(r,{cursor:'pointer',backgroundColor:t.toString(),marginBottom:i?i:''}),r.innerHTML='&nbsp',r},i.prototype._updatePanels=function(){var i=n.Color.fromHsb(this._hsb[0],1,1,1),t=n.Color.fromHsb(this._hsb[0],this._hsb[1],this._hsb[2],1);this._eSB.style.backgroundColor=i.toString();this._eAlpha.style.background='linear-gradient(to right, transparent 0%, '+t.toString()+' 100%)';navigator.appVersion.indexOf('MSIE 9')>-1&&(this._eAlpha.style.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr='+t.toString()+', GradientType = 1)');this._ePreview.style.backgroundColor=this.value;this._cHue.style.top=(this._hsb[0]*100).toFixed(0)+'%';this._cSB.style.left=(this._hsb[1]*100).toFixed(0)+'%';this._cSB.style.top=(100-this._hsb[2]*100).toFixed(0)+'%';this._cAlpha.style.left=(this._alpha*100).toFixed(0)+'%'},i.prototype._getTargetPanel=function(t){var i=t.target;return n.contains(this._eSB,i)?this._eSB:n.contains(this._eHue,i)?this._eHue:n.contains(this._eAlpha,i)?this._eAlpha:null},i.controlTemplate='<div style="position:relative;width:100%;height:100%"><div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px"><div wj-part="div-pal"><div style="float:left;width:10%;box-sizing:border-box;padding:2px"><div style="background-color:black;width:100%">&nbsp;<\/div><div style="height:6px"><\/div><\/div><\/div><div wj-part="div-text" style="position:absolute;bottom:0px;display:none"><\/div><\/div><div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px"><div wj-part="div-sb" class="wj-colorbox" style="float:left;width:89%;height:89%"><div style="position:absolute;width:100%;height:100%;background:linear-gradient(to right, white 0%,transparent 100%)"><\/div><div style="position:absolute;width:100%;height:100%;background:linear-gradient(to top, black 0%,transparent 100%)"><\/div><\/div><div style="float:left;width:1%;height:89%"><\/div><div style="float:left;width:10%;height:89%"><div wj-part="div-hue" class="wj-colorbox"><\/div><\/div><div style="float:left;width:89%;height:1%"><\/div><div style="float:left;width:89%;height:10%"><div style="width:100%;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAAcSURBVBhXY/iPBBYgAWpKQGkwgMqDAdUk/v8HAM7Mm6GatDUYAAAAAElFTkSuQmCC)"><div wj-part="div-alpha" class="wj-colorbox"><\/div><\/div><\/div><div style="float:left;width:1%;height:10%"><\/div><div style="float:left;width:10%;height:10%"><div wj-part="div-pv" class="wj-colorbox" style="position:static"><\/div><\/div><\/div><\/div>',i._tplCursor='<div style="position:absolute;left:50%;top:50%;width:7px;height:7px;transform:translate(-50%,-50%);border:2px solid #f0f0f0;border-radius:50px;box-shadow:0px 0px 4px 2px #0f0f0f"></div>',i}(n.Control);t.ColorPicker=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var r=function(t){function r(i,r){t.call(this,i);this._pathDisplay=new n.Binding(null);this._pathValue=new n.Binding(null);this._pathChecked=new n.Binding(null);this._html=!1;this._checkedItems=[];this._search='';this.selectedIndexChanged=new n.Event;this.itemsChanged=new n.Event;this.loadingItems=new n.Event;this.loadedItems=new n.Event;this.itemChecked=new n.Event;this.checkedItemsChanged=new n.Event;this.formatItem=new n.Event;this.applyTemplate('wj-control wj-listbox wj-content',null,null);this._orgTag=='SELECT'&&this._populateSelectElement(this.hostElement);var u=this.hostElement;this.addEventListener(u,'click',this._click.bind(this));this.addEventListener(u,'keydown',this._keydown.bind(this));this.addEventListener(u,'keypress',this._keypress.bind(this));this.addEventListener(u,'wheel',function(n){u.scrollHeight>u.offsetHeight&&(n.deltaY<0&&u.scrollTop==0||n.deltaY>0&&u.scrollTop+u.offsetHeight>=u.scrollHeight)&&(n.preventDefault(),n.stopPropagation())});this.initialize(r)}return __extends(r,t),r.prototype.refresh=function(){t.prototype.refresh.call(this);(this.displayMemberPath||!this.checkedMemberPath)&&this._populateList()},Object.defineProperty(r.prototype,"itemsSource",{get:function(){return this._items},set:function(t){this._items!=t&&(this._cv&&(this._cv.currentChanged.removeHandler(this._cvCurrentChanged,this),this._cv.collectionChanged.removeHandler(this._cvCollectionChanged,this),this._cv=null),this._items=t,this._cv=n.asCollectionView(t),this._cv!=null&&(this._cv.currentChanged.addHandler(this._cvCurrentChanged,this),this._cv.collectionChanged.addHandler(this._cvCollectionChanged,this)),this._populateList(),this.onItemsChanged(),this.onSelectedIndexChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"collectionView",{get:function(){return this._cv},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isContentHtml",{get:function(){return this._html},set:function(t){t!=this._html&&(this._html=n.asBoolean(t),this._populateList())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemFormatter",{get:function(){return this._itemFormatter},set:function(t){t!=this._itemFormatter&&(this._itemFormatter=n.asFunction(t),this._populateList())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"displayMemberPath",{get:function(){return this._pathDisplay.path},set:function(t){t!=this.displayMemberPath&&(this._pathDisplay.path=n.asString(t),this._populateList())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedValuePath",{get:function(){return this._pathValue.path},set:function(t){this._pathValue.path=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"checkedMemberPath",{get:function(){return this._pathChecked.path},set:function(t){t!=this.checkedMemberPath&&(this._pathChecked.path=n.asString(t),this._populateList())},enumerable:!0,configurable:!0}),r.prototype.getDisplayValue=function(t){var i=null,r;return t>-1&&n.hasItems(this._cv)&&(i=this._cv.items[t],this.displayMemberPath&&(i=this._pathDisplay.getValue(i))),r=i!=null?i.toString():'',this.itemFormatter&&(r=this.itemFormatter(t,r)),r},r.prototype.getDisplayText=function(n){var t=this.hostElement.children,i=n>-1&&n<t.length?t[n]:null;return i!=null?i.textContent:''},Object.defineProperty(r.prototype,"selectedIndex",{get:function(){return this._cv?this._cv.currentPosition:-1},set:function(t){this._cv&&this._cv.moveCurrentToPosition(n.asNumber(t))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedItem",{get:function(){return this._cv?this._cv.currentItem:null},set:function(n){this._cv&&this._cv.moveCurrentTo(n)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedValue",{get:function(){var n=this.selectedItem;return n&&this.selectedValuePath&&(n=this._pathValue.getValue(n)),n},set:function(n){var r=this.selectedValuePath,u=-1,t,i;if(this._cv){for(t=0;t<this._cv.items.length;t++)if(i=this._cv.items[t],r&&this._pathValue.getValue(i)==n||!r&&i==n){u=t;break}this.selectedIndex=u}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxHeight",{get:function(){var n=this.hostElement;return n?parseFloat(n.style.maxHeight):null},set:function(t){var i=this.hostElement;i&&(i.style.maxHeight=n.asNumber(t)+'px')},enumerable:!0,configurable:!0}),r.prototype.showSelection=function(){for(var u,f,i=this.selectedIndex,o=this.hostElement,r=o.children,t,e=0;e<r.length;e++)t=r[e],n.toggleClass(t,'wj-state-selected',e==i);i>-1&&i<r.length&&(t=r[i],u=t.getBoundingClientRect(),f=this.hostElement.getBoundingClientRect(),u.bottom>f.bottom?o.scrollTop+=u.bottom-f.bottom:u.top<f.top&&(o.scrollTop-=f.top-u.top));i>-1&&this.containsFocus()&&(t=r[i],t instanceof HTMLElement&&!n.contains(t,n.getActiveElement())&&t.focus())},r.prototype.getItemChecked=function(t){var r=this._cv.items[t],i;return n.isObject(r)&&this.checkedMemberPath?this._pathChecked.getValue(r):(i=this._getCheckbox(t),i?i.checked:!1)},r.prototype.setItemChecked=function(n,t){this._setItemChecked(n,t,!0)},r.prototype.toggleItemChecked=function(n){this.setItemChecked(n,!this.getItemChecked(n))},Object.defineProperty(r.prototype,"checkedItems",{get:function(){if(this._checkedItems.splice(0,this._checkedItems.length),this._cv)for(var n=0;n<this._cv.items.length;n++)this.getItemChecked(n)&&this._checkedItems.push(this._cv.items[n]);return this._checkedItems},set:function(t){var i=this._cv,u=n.asArray(t,!1),f,r,e;if(i&&u){for(f=i.currentPosition,r=0;r<i.items.length;r++)e=i.items[r],this._setItemChecked(r,u.indexOf(e)>-1,!1);i.moveCurrentToPosition(f);this.onCheckedItemsChanged()}},enumerable:!0,configurable:!0}),r.prototype.onSelectedIndexChanged=function(n){this.selectedIndexChanged.raise(this,n)},r.prototype.onItemsChanged=function(n){this.itemsChanged.raise(this,n)},r.prototype.onLoadingItems=function(n){this.loadingItems.raise(this,n)},r.prototype.onLoadedItems=function(n){this.loadedItems.raise(this,n)},r.prototype.onItemChecked=function(n){this.itemChecked.raise(this,n)},r.prototype.onCheckedItemsChanged=function(n){this.checkedItemsChanged.raise(this,n)},r.prototype.onFormatItem=function(n){this.formatItem.raise(this,n)},r.prototype._setItemChecked=function(t,i,r){var u,f,e;r===void 0&&(r=!0);u=this._cv.items[t];n.isObject(u)&&(f=n.tryCast(this._cv,'IEditableCollectionView'),this._pathChecked.getValue(u)!=i&&(this._checking=!0,f?(f.editItem(u),this._pathChecked.setValue(u,i),f.commitEdit()):(this._pathChecked.setValue(u,i),this._cv.refresh()),this._checking=!1));e=this._getCheckbox(t);e&&e.checked!=i&&(e.checked=i);r&&(this.onItemChecked(),this.onCheckedItemsChanged())},r.prototype._cvCollectionChanged=function(){this._checking||(this._populateList(),this.onItemsChanged())},r.prototype._cvCurrentChanged=function(){this.showSelection();this.onSelectedIndexChanged()},r.prototype._populateList=function(){var f=this.hostElement,e,t,u,o,r,s;if(f){if(e=this.containsFocus(),this.onLoadingItems(),f.innerHTML='',this._cv)for(t=0;t<this._cv.items.length;t++){if(u=this.getDisplayValue(t),this._html!=!0&&(u=n.escapeHtml(u)),this.checkedMemberPath&&(o=this._pathChecked.getValue(this._cv.items[t]),u='<label><input type="checkbox"'+(o?' checked':'')+'> '+u+'</label>'),r=document.createElement('div'),r.innerHTML=u,r.className='wj-listbox-item',n.hasClass(r.firstChild,'wj-separator')&&(r.className+=' wj-separator'),this.formatItem.hasHandlers){s=new i(t,this._cv.items[t],r);this.onFormatItem(s)}f.appendChild(r)}f.children.length==0&&f.appendChild(document.createElement('div'));e&&!this.containsFocus()&&this.focus();this.showSelection();this.onLoadedItems()}},r.prototype._click=function(t){var r,i,u;if(!t.defaultPrevented){for(r=this.hostElement.children,i=0;i<r.length;i++)if(n.contains(r[i],t.target)){this.selectedIndex=i;break}i=this.selectedIndex;this.checkedMemberPath&&i>-1&&(u=this._getCheckbox(i),u==t.target&&this.setItemChecked(i,u.checked))}},r.prototype._keydown=function(t){var i,r,s;if(!t.defaultPrevented&&!t.ctrlKey&&!t.shiftKey&&!t.altKey&&!t.metaKey){var u=this.selectedIndex,o=this.hostElement,f=o.children;switch(t.keyCode){case n.Key.Down:for(t.preventDefault(),i=this.selectedIndex+1;i<f.length;i++)if(this.getDisplayText(i)){this.selectedIndex=i;break}break;case n.Key.Up:for(t.preventDefault(),i=this.selectedIndex-1;i>=0;i--)if(this.getDisplayText(i)){this.selectedIndex=i;break}break;case n.Key.Home:t.preventDefault();this.selectedIndex=0;break;case n.Key.End:t.preventDefault();this.selectedIndex=f.length-1;break;case n.Key.PageDown:if(t.preventDefault(),this.selectedIndex>-1){var u=this.selectedIndex,h=o.offsetHeight,e=0;for(i=u+1;i<this._cv.items.length;i++){if(r=f[i].scrollHeight,e+r>h){this.selectedIndex=i;break}e+=r}this.selectedIndex==u&&this._cv.moveCurrentToLast()}break;case n.Key.PageUp:if(t.preventDefault(),this.selectedIndex>-1){var u=this.selectedIndex,h=o.offsetHeight,e=0;for(i=u-1;i>0;i--){if(r=f[i].scrollHeight,e+r>h){this.selectedIndex=i;break}e+=r}this.selectedIndex==u&&this._cv.moveCurrentToFirst()}break;case n.Key.Space:this.checkedMemberPath&&this.selectedIndex>-1&&(s=this._getCheckbox(this.selectedIndex),s&&(this.hostElement.focus(),this.setItemChecked(this.selectedIndex,!s.checked),t.preventDefault()))}}},r.prototype._keypress=function(n){var i=this,t;n.defaultPrevented||n.target instanceof HTMLInputElement||(n.charCode>32||n.charCode==32&&this._search)&&(n.preventDefault(),this._search+=String.fromCharCode(n.charCode).toLowerCase(),console.log('looking for '+this._search),this._toSearch&&clearTimeout(this._toSearch),this._toSearch=setTimeout(function(){i._toSearch=0;i._search=''},600),t=this._findNext(),t<0&&this._search.length>1&&(this._search=this._search[this._search.length-1],t=this._findNext()),t>-1&&(this.selectedIndex=t))},r.prototype._findNext=function(){var r,n,t,i,u;if(this.hostElement)for(r=this.hostElement.childElementCount,n=this.selectedIndex,(n<0||this._search.length==1)&&n++,t=0;t<r;t++)if(i=(n+t)%r,u=this.getDisplayText(i).trim().toLowerCase(),u.indexOf(this._search)==0)return console.log('match at '+i),i;return-1},r.prototype._getCheckbox=function(n){var t=this.hostElement;return t&&n>-1&&n<t.children.length?t.children[n].querySelector('input[type=checkbox]'):null},r.prototype._populateSelectElement=function(n){for(var t,u=n.children,i=[],f=-1,r=0;r<u.length;r++)t=u[r],t.tagName=='OPTION'&&(t.hasAttribute('selected')&&(f=i.length),t.innerHTML?i.push({hdr:t.innerHTML,val:t.getAttribute('value'),cmdParam:t.getAttribute('cmd-param')}):i.push({hdr:'<div class="wj-separator"/>'}),n.removeChild(t),r--);i&&(this.displayMemberPath='hdr',this.selectedValuePath='val',this.itemsSource=i,this.selectedIndex=f)},r}(n.Control),i;t.ListBox=r;i=function(t){function i(i,r,u){t.call(this);this._index=n.asNumber(i);this._data=r;this._item=n.asType(u,HTMLElement)}return __extends(i,t),Object.defineProperty(i.prototype,"index",{get:function(){return this._index},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"item",{get:function(){return this._item},enumerable:!0,configurable:!0}),i}(n.EventArgs);t.FormatItemEventArgs=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(i){function r(t,r){var u=this;i.call(this,t);this._editable=!1;this._composing=!1;this._deleting=!1;this._settingText=!1;this.selectedIndexChanged=new n.Event;n.addClass(this.hostElement,'wj-combobox');this.autoExpandSelection=!1;this.addEventListener(this._tbx,'compositionstart',function(){u._composing=!0});this.addEventListener(this._tbx,'compositionend',function(){u._composing=!1;setTimeout(function(){u._setText(u.text,!0)})});this.addEventListener(this.hostElement,'wheel',function(t){if(!t.defaultPrevented&&!u.isDroppedDown&&!u.isReadOnly&&u.containsFocus()&&u.selectedIndex>-1){var i=n.clamp(-t.deltaY,-1,1);u.selectedIndex=n.clamp(u.selectedIndex-i,0,u.collectionView.items.length-1);t.preventDefault()}});this._orgTag=='SELECT'&&this._lbx._populateSelectElement(this.hostElement);this.isRequired=!0;this.initialize(r)}return __extends(r,i),Object.defineProperty(r.prototype,"itemsSource",{get:function(){return this._lbx.itemsSource},set:function(n){this._lbx.itemsSource=n;this._updateBtn()},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"collectionView",{get:function(){return this._lbx.collectionView},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"displayMemberPath",{get:function(){return this._lbx.displayMemberPath},set:function(n){this._lbx.displayMemberPath=n;var t=this.getDisplayText();this.text!=t&&this._setText(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"headerPath",{get:function(){return this._hdrPath},set:function(t){this._hdrPath=n.asString(t);var i=this.getDisplayText();this.text!=i&&this._setText(i,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedValuePath",{get:function(){return this._lbx.selectedValuePath},set:function(n){this._lbx.selectedValuePath=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isContentHtml",{get:function(){return this._lbx.isContentHtml},set:function(t){if(t!=this.isContentHtml){this._lbx.isContentHtml=n.asBoolean(t);var i=this.getDisplayText();this.text!=i&&this._setText(i,!0)}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemFormatter",{get:function(){return this._lbx.itemFormatter},set:function(t){this._lbx.itemFormatter=n.asFunction(t);this.selectedIndex=this._lbx.selectedIndex},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedIndex",{get:function(){return this._lbx.selectedIndex},set:function(n){n!=this.selectedIndex&&(this._lbx.selectedIndex=n);var t=this.getDisplayText(n);this.text!=t&&this._setText(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedItem",{get:function(){return this._lbx.selectedItem},set:function(n){this._lbx.selectedItem=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectedValue",{get:function(){return this._lbx.selectedValue},set:function(n){this._lbx.selectedValue=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isEditable",{get:function(){return this._editable},set:function(t){this._editable=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxDropDownHeight",{get:function(){return this._lbx.maxHeight},set:function(t){this._lbx.maxHeight=n.asNumber(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxDropDownWidth",{get:function(){var n=this._dropDown;return parseInt(n.style.maxWidth)},set:function(t){var i=this._dropDown;i.style.maxWidth=n.asNumber(t)+'px'},enumerable:!0,configurable:!0}),r.prototype.getDisplayText=function(t){if(t===void 0&&(t=this.selectedIndex),this.headerPath&&t>-1&&n.hasItems(this.collectionView)){var r=this.collectionView.items[t][this.headerPath],i=r!=null?r.toString():'';return this.isContentHtml&&(this._cvt||(this._cvt=document.createElement('div')),this._cvt.innerHTML=i,i=this._cvt.textContent),i}return this._lbx.getDisplayText(t)},r.prototype.onSelectedIndexChanged=function(n){this._updateBtn();this.selectedIndexChanged.raise(this,n)},r.prototype.indexOf=function(t,i){var f=this.collectionView,r,u;if(n.hasItems(f)&&t){if(i&&this.selectedIndex>-1&&t==this.getDisplayText(this.selectedIndex))return this.selectedIndex;for(t=t.toString().toLowerCase(),r=0;r<f.items.length;r++)if(u=this.getDisplayText(r).toLowerCase(),i){if(u==t)return r}else if(t&&u.indexOf(t)==0)return r}return-1},Object.defineProperty(r.prototype,"listBox",{get:function(){return this._lbx},enumerable:!0,configurable:!0}),r.prototype.refresh=function(t){i.prototype.refresh.call(this,t);n.hasItems(this.collectionView)&&(this._lbx.refresh(),this.selectedIndex>-1&&(this.selectedIndex=this._lbx.selectedIndex))},r.prototype.onLostFocus=function(t){this.isEditable&&this.isRequired&&!this.text&&n.hasItems(this.collectionView)&&(this.selectedIndex=0);i.prototype.onLostFocus.call(this,t)},r.prototype.onIsDroppedDownChanging=function(t){return n.hasItems(this.collectionView)?i.prototype.onIsDroppedDownChanging.call(this,t):!1},r.prototype.onIsDroppedDownChanged=function(n){i.prototype.onIsDroppedDownChanged.call(this,n);this.isDroppedDown&&(this._lbx.showSelection(),this.isTouching||this.selectAll())},r.prototype._updateBtn=function(){var t=this.collectionView;this._btn.style.display=this._showBtn&&n.hasItems(t)?'':'none'},r.prototype._createDropDown=function(){var n=this;this._lbx=new t.ListBox(this._dropDown);this._lbx.maxHeight=200;this._lbx.selectedIndexChanged.addHandler(function(){n._updateBtn();n.selectedIndex=n._lbx.selectedIndex;n.onSelectedIndexChanged()});this._lbx.itemsChanged.addHandler(function(){n._updateBtn()});this.addEventListener(this._dropDown,'click',this._dropDownClick.bind(this))},r.prototype._dropDownClick=function(n){n.defaultPrevented||n.target!=this._dropDown&&(this.isDroppedDown=!1)},r.prototype._setText=function(t,r){var f;if(!this._composing&&!this._settingText){this._settingText=!0;t==null&&(t='');t=t.toString();var u=this.selectedIndex,o=this.collectionView,e=this._getSelStart(),s=-1;if(this._deleting&&(r=!0),this._deleting?u=this.indexOf(t,!0):(u=this.indexOf(t,r),u<0&&r&&(u=this.indexOf(t,!1)),u<0&&e>0&&(u=this.indexOf(t.substr(0,e),!1))),u<0&&!this.isEditable&&n.hasItems(o)&&(this.isRequired||t))for(u=Math.max(0,this.indexOf(this._oldText,!1)),f=0;f<t.length&&f<this._oldText.length;f++)if(t[f]!=this._oldText[f]){e=f;break}u>-1&&(s=e,t=this.getDisplayText(u));o&&o.moveCurrentToPosition(u);t!=this._tbx.value&&(this._tbx.value=t);s>-1&&this.containsFocus()&&!this.isTouching&&this._setSelRange(s,t.length);i.prototype._setText.call(this,t,r);this._deleting=!1;this._settingText=!1}},r.prototype._findNext=function(n,t){var i,u,f,r;if(this.collectionView)for(n=n.toLowerCase(),i=this.collectionView.items.length,r=1;r<=i;r++)if(u=(this.selectedIndex+r*t+i)%i,f=this.getDisplayText(u).toLowerCase(),f.indexOf(n)==0)return u;return this.selectedIndex},r.prototype._keydown=function(t){var u,r;if((i.prototype._keydown.call(this,t),!t.defaultPrevented)&&this._elRef==this._tbx&&((t.keyCode==n.Key.Back||t.keyCode==n.Key.Delete)&&(this._deleting=!0),u=this.collectionView,u&&u.items))switch(t.keyCode){case n.Key.Up:case n.Key.Down:r=this._getSelStart();r==this.text.length&&(r=0);this.selectedIndex=this._findNext(this.text.substr(0,r),t.keyCode==n.Key.Up?-1:1);n.setSelectionRange(this._tbx,r,this.text.length);t.preventDefault()}},r.prototype._setSelRange=function(t,i){this._elRef==this._tbx&&n.setSelectionRange(this._tbx,t,i)},r.prototype._getSelStart=function(){return this._tbx&&this._tbx.value?this._tbx.selectionStart:0},r}(t.DropDown);t.ComboBox=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){t.call(this,i);this._cssMatch='wj-autocomplete-match';this._minLength=2;this._maxItems=6;this._itemCount=0;this._delay=500;this._query='';this._inCallback=!1;this._srchProps=[];n.addClass(this.hostElement,'wj-autocomplete');this.isEditable=!0;this.isRequired=!1;this.isContentHtml=!0;this.listBox.itemFormatter=this._defaultFormatter.bind(this);this.initialize(r)}return __extends(i,t),Object.defineProperty(i.prototype,"minLength",{get:function(){return this._minLength},set:function(t){this._minLength=n.asNumber(t,!1,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"maxItems",{get:function(){return this._maxItems},set:function(t){this._maxItems=n.asNumber(t,!1,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"delay",{get:function(){return this._delay},set:function(t){this._delay=n.asNumber(t,!1,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"searchMemberPath",{get:function(){return this._srchProp},set:function(t){this._srchProp=n.asString(t);this._srchProps=t?t.trim().split(/\s*,\s*/):[]},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"itemsSourceFunction",{get:function(){return this._itemsSourceFn},set:function(t){this._itemsSourceFn=n.asFunction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"cssMatch",{get:function(){return this._cssMatch},set:function(t){this._cssMatch=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"itemFormatter",{get:function(){return this._itemFormatter},set:function(t){this._itemFormatter=n.asFunction(t)},enumerable:!0,configurable:!0}),i.prototype._keydown=function(i){if(!i.defaultPrevented&&this.isDroppedDown)switch(i.keyCode){case n.Key.Up:case n.Key.Down:this.selectAll()}t.prototype._keydown.call(this,i)},i.prototype._setText=function(n){var t=this;if(!this._inCallback){if(!n&&this.selectedIndex>-1&&(this.selectedIndex=-1),n!=this._oldText&&(this._tbx.value!=n&&(this._tbx.value=n),this._oldText=n,this.onTextChanged(),!n&&this.collectionView)){this.collectionView.filter=this._query=null;this.isDroppedDown=!1;return}this._toSearch&&clearTimeout(this._toSearch);n!=this.getDisplayText()&&(this._toSearch=setTimeout(function(){t._toSearch=null;var n=t.text.trim().toLowerCase();n.length>=t._minLength&&n!=t._query&&(t._query=n,n=n.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),t._rxMatch=new RegExp('(?=.*'+n.replace(/ /g,')(?=.*')+')','ig'),t._rxHighlight=new RegExp('('+n.replace(/ /g,'|')+')','ig'),t.itemsSourceFunction?t.itemsSourceFunction(n,t.maxItems,t._itemSourceFunctionCallback.bind(t)):t._updateItems())},this._delay))}},i.prototype._itemSourceFunctionCallback=function(t){this._inCallback=!0;var i=n.asCollectionView(t);i&&i.moveCurrentToPosition(-1);this.itemsSource=i;this.isDroppedDown=!0;this._inCallback=!1;this.refresh()},i.prototype.onIsDroppedDownChanged=function(n){this.isDroppedDownChanged.raise(this,n);this._query='';this.selectedIndex>-1?(this._setText(this.getDisplayText()),this.isTouching||this.selectAll()):this.isTouching||this._tbx.focus()},i.prototype._updateItems=function(){var n=this.collectionView;n&&(this._inCallback=!0,n.beginUpdate(),this._itemCount=0,n.filter=this._filter.bind(this),n.moveCurrentToPosition(-1),n.endUpdate(),this._inCallback=!1,this.isDroppedDown=n.items.length>0&&this.containsFocus(),n.items.length!=0||this.isEditable||(this.selectedIndex=-1),this.refresh())},i.prototype._filter=function(n){var t,i;if(this._itemCount>=this._maxItems)return!1;if(t=n?n.toString():'',this.displayMemberPath)for(t=n[this.displayMemberPath],i=0;i<this._srchProps.length;i++)t+='\0'+n[this._srchProps[i]];return this._rxMatch.test(t)?(this._itemCount++,!0):!1},i.prototype._defaultFormatter=function(n,t){if(this._itemFormatter&&(t=this._itemFormatter(n,t)),this._rxHighlight&&this._cssMatch){var i='<span class="'+this._cssMatch+'">$1</span>';t=t.replace(this._rxHighlight,i)}return t},i}(t.ComboBox);t.AutoComplete=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){var u=this,f;t.call(this,i);this.itemClicked=new n.Event;n.addClass(this.hostElement,'wj-menu');this._tbx.style.display='none';f='<div wj-part="header" class="wj-form-control" style="cursor:default"/>';this._hdr=n.createElement(f);this._tbx.parentElement.insertBefore(this._hdr,this._tbx);this._elRef=this._hdr;this.isRequired=!1;this._orgTag=='SELECT'&&(this.header=this.hostElement.getAttribute('header'),this._lbx.itemsSource&&(this.commandParameterPath='cmdParam'));this.isContentHtml=!0;this.maxDropDownHeight=500;this.addEventListener(this._hdr,'click',function(n){n.defaultPrevented||(u._isButton?(u.isDroppedDown=!1,u._raiseCommand()):u.isDroppedDown=!u.isDroppedDown)});this.initialize(r)}return __extends(i,t),Object.defineProperty(i.prototype,"header",{get:function(){return this._hdr.innerHTML},set:function(t){this._hdr.innerHTML=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"command",{get:function(){return this._command},set:function(n){this._command=n},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"commandPath",{get:function(){return this._cmdPath},set:function(t){this._cmdPath=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"commandParameterPath",{get:function(){return this._cmdParamPath},set:function(t){this._cmdParamPath=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isButton",{get:function(){return this._isButton},set:function(t){this._isButton=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"owner",{get:function(){return this._owner},set:function(t){this._owner=n.asType(t,HTMLElement,!0);this._enableDisableItems()},enumerable:!0,configurable:!0}),i.prototype.onItemClicked=function(n){this.itemClicked.raise(this,n)},i.prototype.onIsDroppedDownChanged=function(n){t.prototype.onIsDroppedDownChanged.call(this,n);this.isDroppedDown?(this._closing=!0,this._defaultItem=this.selectedItem,this.isRequired=!1,this.selectedIndex=-1,this._enableDisableItems(),this._closing=!1,this.dropDown.focus()):this.selectedItem||(this.selectedItem=this._defaultItem)},i.prototype._keydown=function(i){i.defaultPrevented||i.keyCode==n.Key.Enter&&(this.isDroppedDown?this.getDisplayText(this.selectedIndex)&&this._raiseCommand():(this.isDroppedDown=!0,i.preventDefault()));t.prototype._keydown.call(this,i)},i.prototype._dropDownClick=function(n){n.defaultPrevented||this.getDisplayText(this.selectedIndex)&&this._raiseCommand();t.prototype._dropDownClick.call(this,n)},i.prototype._raiseCommand=function(n){var r=this.selectedItem,t=this._getCommand(r),i;if(t){if(i=this._cmdParamPath?r[this._cmdParamPath]:null,!this._canExecuteCommand(t,i))return;this._executeCommand(t,i)}this.onItemClicked(n)},i.prototype._getCommand=function(n){var t=n&&this.commandPath?n[this.commandPath]:null;return t?t:this.command},i.prototype._executeCommand=function(t,i){t&&!n.isFunction(t)&&(t=t.executeCommand);n.isFunction(t)&&t(i)},i.prototype._canExecuteCommand=function(t,i){if(t){var r=t.canExecuteCommand;if(n.isFunction(r))return r(i)}return!0},i.prototype._enableDisableItems=function(){var i,t,r,u,f;if(this.collectionView&&(this.command||this.commandPath))for(i=this.collectionView.items,t=0;t<i.length;t++)r=this._getCommand(i[t]),u=this.commandParameterPath?i[t][this.commandParameterPath]:null,r&&(f=this._lbx.hostElement.children[t],n.toggleClass(f,'wj-state-disabled',!this._canExecuteCommand(r,u)))},i}(t.ComboBox);t.Menu=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};wijmo.culture.MultiSelect={itemsSelected:'{count:n0} items selected'},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){var u=this;t.call(this,i);this._maxHdrItems=2;this._readOnly=!1;this._hdrFmt=n.culture.MultiSelect.itemsSelected;this.checkedItemsChanged=new n.Event;n.addClass(this.hostElement,'wj-multiselect');this._tbx.readOnly=!0;this.checkedMemberPath=null;this.addEventListener(this.inputElement,'click',function(){u.isDroppedDown=!u.isDroppedDown});this.removeEventListener(this.dropDown,'click');this._updateHeader();this.listBox.itemsChanged.addHandler(function(){u._updateHeader()});this.listBox.checkedItemsChanged.addHandler(function(){u._updateHeader();u.onCheckedItemsChanged()});this.initialize(r)}return __extends(i,t),Object.defineProperty(i.prototype,"checkedMemberPath",{get:function(){var n=this.listBox.checkedMemberPath;return n!=i._DEF_CHECKED_PATH?n:null},set:function(t){t=n.asString(t);this.listBox.checkedMemberPath=t?t:i._DEF_CHECKED_PATH},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"maxHeaderItems",{get:function(){return this._maxHdrItems},set:function(t){this._maxHdrItems!=t&&(this._maxHdrItems=n.asNumber(t),this._updateHeader())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"headerFormat",{get:function(){return this._hdrFmt},set:function(t){t!=this._hdrFmt&&(this._hdrFmt=n.asString(t),this._updateHeader())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"headerFormatter",{get:function(){return this._hdrFormatter},set:function(t){t!=this._hdrFormatter&&(this._hdrFormatter=n.asFunction(t),this._updateHeader())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"checkedItems",{get:function(){return this.listBox.checkedItems},set:function(t){this.listBox.checkedItems=n.asArray(t)},enumerable:!0,configurable:!0}),i.prototype.onCheckedItemsChanged=function(n){this.checkedItemsChanged.raise(this,n)},Object.defineProperty(i.prototype,"isReadOnly",{get:function(){return this._readOnly},set:function(t){this._readOnly=n.asBoolean(t);n.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly)},enumerable:!0,configurable:!0}),i.prototype.refresh=function(n){n===void 0&&(n=!0);t.prototype.refresh.call(this,n);this._updateHeader()},i.prototype.onIsDroppedDownChanged=function(n){t.prototype.onIsDroppedDownChanged.call(this,n);this.isDroppedDown&&this.dropDown.focus()},i.prototype._setText=function(){},i.prototype._updateHeader=function(){var t,r,i;if(this._hdrFormatter)this.inputElement.value=this._hdrFormatter();else{if(t=this.checkedItems,r='',t.length>0)if(t.length<=this._maxHdrItems){if(this.displayMemberPath)for(i=0;i<t.length;i++)t[i]=t[i][this.displayMemberPath];r=t.join(', ')}else r=n.format(this.headerFormat,{count:t.length});this.inputElement.value=r}this._updateState()},i._DEF_CHECKED_PATH='$checked',i}(t.ComboBox);t.MultiSelect=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';(function(n){n[n.None=0]="None";n[n.Click=1]="Click";n[n.Blur=2]="Blur"})(t.PopupTrigger||(t.PopupTrigger={}));var i=t.PopupTrigger,r=function(t){function r(r,u){var f=this,e;t.call(this,r,null,!0);this._showTrigger=i.Click;this._hideTrigger=i.Blur;this._fadeIn=!0;this._fadeOut=!0;this._click=this._handleClick.bind(this);this._visible=!1;this.showing=new n.Event;this.shown=new n.Event;this.hiding=new n.Event;this.hidden=new n.Event;e=this.hostElement;n.addClass(e,'wj-control wj-content wj-popup');e.getAttribute('tabindex')||(e.tabIndex=0);n.hidePopup(e,!1);this.addEventListener(e,'keydown',function(t){if(!t.defaultPrevented&&(t.keyCode==n.Key.Escape&&(t.preventDefault(),f.hide()),t.keyCode==n.Key.Enter)){var i=f.dialogResultEnter;i&&(t.preventDefault(),f._validateAndHide(i))}});this.addEventListener(e,'keydown',function(t){!t.defaultPrevented&&f.modal&&t.keyCode==n.Key.Tab&&(t.preventDefault(),n.moveFocus(f.hostElement,t.shiftKey?-1:1))});this.addEventListener(e,'click',function(n){if(n.target instanceof HTMLElement){var i=n.target,t=i.className.match(/\bwj-hide[\S]*\b/);t&&t.length>0&&(n.preventDefault(),n.stopPropagation(),f.hide(t[0]))}});this.addEventListener(document,'wheel',function(n){if(f.isVisible&&f._modal){for(var t=n.target;t&&t!=document.body;t=t.parentElement)if(t.scrollHeight>t.clientHeight)return;n.preventDefault();n.stopPropagation()}});this.initialize(u)}return __extends(r,t),Object.defineProperty(r.prototype,"owner",{get:function(){return this._owner},set:function(t){this._owner&&this.removeEventListener(this._owner,'click');this._owner=t!=null?n.getElement(t):null;this._owner&&this.addEventListener(this._owner,'click',this._click,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"content",{get:function(){return this.hostElement.firstElementChild},set:function(n){n!=this.content&&(this.hostElement.innerHTML='',n instanceof HTMLElement&&this.hostElement.appendChild(n))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"showTrigger",{get:function(){return this._showTrigger},set:function(t){this._showTrigger=n.asEnum(t,i)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"hideTrigger",{get:function(){return this._hideTrigger},set:function(t){this._hideTrigger=n.asEnum(t,i)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"fadeIn",{get:function(){return this._fadeIn},set:function(t){this._fadeIn=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"fadeOut",{get:function(){return this._fadeOut},set:function(t){this._fadeOut=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"modal",{get:function(){return this._modal},set:function(t){this._modal=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"dialogResult",{get:function(){return this._result},set:function(n){this._result=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"dialogResultEnter",{get:function(){return this._resultEnter},set:function(n){this._resultEnter=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isVisible",{get:function(){var n=this.hostElement;return this._visible&&n&&n.style.display!='none'},enumerable:!0,configurable:!0}),r.prototype.show=function(t,i){var r=this,u,f;if(!this.isVisible&&(this.dialogResult=null,this._callback=null,u=new n.CancelEventArgs,this.onShowing(u))){t!=null&&(this.modal=n.asBoolean(t));i!=null&&(this._callback=n.asFunction(i));f=this._owner?this._owner.getBoundingClientRect():null;n.showPopup(this.hostElement,f,!1,this._fadeIn);this._modal&&this._showBackdrop();this._visible=!0;this.onShown(u);setTimeout(function(){if(!r.isTouching){var t=r.hostElement.querySelector('input[autofocus]');t&&t.clientHeight>0&&!t.disabled&&t.tabIndex>-1&&!n.closest(t,'[disabled],.wj-state-disabled')?(t.focus(),t.select()):n.moveFocus(r.hostElement,0)}r.containsFocus()||(r.hostElement.tabIndex=0,r.hostElement.focus())},200)}},r.prototype.hide=function(t){if(this.isVisible){n.isUndefined(t)||(this.dialogResult=t);var i=new n.CancelEventArgs;if(this.onHiding(i)){this._modal&&n.hidePopup(this._bkdrop,!0,this.fadeOut);n.hidePopup(this.hostElement,!0,this.fadeOut);this._visible=!1;this.onHidden(i);this._callback&&this._callback(this)}}},r.prototype.onShowing=function(n){return this.showing.raise(this,n),!n.cancel},r.prototype.onShown=function(n){this.shown.raise(this,n)},r.prototype.onHiding=function(n){return this.hiding.raise(this,n),!n.cancel},r.prototype.onHidden=function(n){this.hidden.raise(this,n)},r.prototype.dispose=function(){this._owner=null;t.prototype.dispose.call(this)},r.prototype.onLostFocus=function(n){this.isVisible&&this._hideTrigger&i.Blur&&(this.containsFocus()||this.hide());t.prototype.onLostFocus.call(this,n)},r.prototype.refresh=function(i){if(i===void 0&&(i=!0),t.prototype.refresh.call(this,i),this.isVisible&&!this._refreshing){this._refreshing=!0;var r=n.getActiveElement(),u=this._owner?this._owner.getBoundingClientRect():null;n.showPopup(this.hostElement,u);this._modal&&r instanceof HTMLElement&&r!=n.getActiveElement()&&r.focus();this._refreshing=!1}},r.prototype._handleResize=function(){this.isVisible&&this.refresh()},r.prototype._handleClick=function(){if(this.isVisible)this._hideTrigger&i.Click&&this.hide();else if(this._showTrigger&i.Click){var n=this.hostElement;n&&n.style.display=='none'&&this.show()}},r.prototype._showBackdrop=function(){var i=this,t;this._bkdrop||(this._bkdrop=document.createElement('div'),this._bkdrop.tabIndex=-1,n.addClass(this._bkdrop,'wj-popup-backdrop'),this.addEventListener(this._bkdrop,'mousedown',function(n){n.preventDefault();n.stopPropagation();i.hostElement.focus()}));this._bkdrop.style.display='';t=this.hostElement;t.parentElement.insertBefore(this._bkdrop,t)},r.prototype._validateAndHide=function(n){var t=this.hostElement.querySelector(':invalid');t?t.focus():this.hide(n)},r}(n.Control);t.Popup=r})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(i){function r(r,u){var f=this,e;i.call(this,r);this._format='d';this.valueChanged=new n.Event;n.addClass(this.hostElement,'wj-inputdate');this._msk=new n._MaskProvider(this._tbx);n.isIE9()||(this._tbx.type='tel');this.addEventListener(this.hostElement,'wheel',function(i){if(!i.defaultPrevented&&!f.isDroppedDown&&f.containsFocus()&&f.value!=null&&f._canChangeValue()){var r=n.clamp(-i.deltaY,-1,1);f.value=f.selectionMode==t.DateSelectionMode.Month?n.DateTime.addMonths(f.value,r):n.DateTime.addDays(f.value,r);f.selectAll();i.preventDefault()}});this.value=n.DateTime.newDate();this._orgTag=='INPUT'&&(e=this._tbx.getAttribute('value'),e&&(this.value=n.Globalize.parseDate(e,'yyyy-MM-dd')));this.isRequired=!0;this.initialize(u)}return __extends(r,i),Object.defineProperty(r.prototype,"value",{get:function(){return this._value},set:function(t){n.DateTime.equals(this._value,t)?this._tbx.value=n.Globalize.format(t,this.format):(t=n.asDate(t,!this.isRequired||t==null&&this._value==null),t=this._clamp(t),this._isValidDate(t)?(this._tbx.value=t?n.Globalize.format(t,this.format):'',t==this._value||n.DateTime.equals(this._value,t)||(this._value=t,this.onValueChanged())):this._tbx.value=t?n.Globalize.format(this.value,this.format):'',this.text!=this._oldText&&this.onTextChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"text",{get:function(){return this._tbx.value},set:function(n){n!=this.text&&(this._setText(n,!0),this._commitText())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"selectionMode",{get:function(){return this.calendar.selectionMode},set:function(n){this.calendar.selectionMode=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"min",{get:function(){return this._calendar.min},set:function(t){this._calendar.min=n.asDate(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"max",{get:function(){return this._calendar.max},set:function(t){this._calendar.max=n.asDate(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"format",{get:function(){return this._format},set:function(t){t!=this.format&&(this._format=n.asString(t),this._tbx.value=n.Globalize.format(this.value,this.format))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"mask",{get:function(){return this._msk.mask},set:function(t){this._msk.mask=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"calendar",{get:function(){return this._calendar},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputElement",{get:function(){return this._tbx},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputType",{get:function(){return this._tbx.type},set:function(t){this._tbx.type=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemValidator",{get:function(){return this._calendar.itemValidator},set:function(t){t!=this.itemValidator&&(this._calendar.itemValidator=n.asFunction(t),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"itemFormatter",{get:function(){return this.calendar.itemFormatter},set:function(t){t!=this.itemFormatter&&(this.calendar.itemFormatter=n.asFunction(t))},enumerable:!0,configurable:!0}),r.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},r.prototype.refresh=function(){this.isDroppedDown=!1;this._msk&&this._msk.refresh();this._calendar&&this._calendar.refresh();this._tbx.value=n.Globalize.format(this.value,this.format)},r.prototype.onIsDroppedDownChanged=function(n){i.prototype.onIsDroppedDownChanged.call(this,n);this.isDroppedDown&&(this._calChanged=!1,this.dropDown.focus())},r.prototype._createDropDown=function(){var i=this;this._calendar=new t.Calendar(this._dropDown);this._dropDown.tabIndex=-1;this._calendar.valueChanged.addHandler(function(){i.value=n.DateTime.fromDateTime(i._calendar.value,i.value);i._calChanged=!0});this.addEventListener(this._dropDown,'mouseup',function(n){i._calChanged?i.isDroppedDown=!1:n.target.getAttribute('wj-part')=='btn-today'&&(i.isDroppedDown=!1)})},r.prototype._updateDropDown=function(){var n,r;this._commitText();n=this._calendar;n.value=this.value;n.min=this.min;n.max=this.max;this.selectionMode!=t.DateSelectionMode.Month&&(n.monthView=!0);r=getComputedStyle(this.hostElement);this._dropDown.style.minWidth=parseFloat(r.fontSize)*18+'px';this._calendar.refresh();i.prototype._updateDropDown.call(this)},r.prototype._keydown=function(r){if(!r.defaultPrevented&&!r.altKey&&!r.ctrlKey&&!r.metaKey)switch(r.keyCode){case n.Key.Enter:this._commitText();this.selectAll();break;case n.Key.Escape:this.text=n.Globalize.format(this.value,this.format);this.selectAll();break;case n.Key.Up:case n.Key.Down:if(!this.isDroppedDown&&this.value&&this._canChangeValue()){var u=r.keyCode==n.Key.Up?1:-1;this.value=this.selectionMode==t.DateSelectionMode.Month?n.DateTime.addMonths(this.value,u):n.DateTime.addDays(this.value,u);this.selectAll();r.preventDefault()}}i.prototype._keydown.call(this,r)},r.prototype._canChangeValue=function(){return!this.isReadOnly&&this.selectionMode!=t.DateSelectionMode.None},r.prototype._clamp=function(n){return this.calendar._clamp(n)},r.prototype._commitText=function(){var i=this._tbx.value,t;i||this.isRequired?(t=n.Globalize.parseDate(i,this.format),t?this.value=n.DateTime.fromDateTime(t,this.value):this._tbx.value=n.Globalize.format(this.value,this.format)):this.value=null},r.prototype._isValidDate=function(n){return n&&(this._clamp(n)!=n||this.itemValidator&&!this.itemValidator(n))?!1:!0},r}(t.DropDown);t.InputDate=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){if(t.call(this,i),this._format='t',this.valueChanged=new n.Event,n.addClass(this.hostElement,'wj-inputtime'),this._value=n.DateTime.newDate(),this._msk=new n._MaskProvider(this._tbx),n.isIE9()||(this._tbx.type='tel'),this._orgTag=='INPUT'){var u=this._tbx.getAttribute('value');u&&(this.value=n.Globalize.parseDate(u,'HH:mm:ss'))}this.step=15;this.autoExpandSelection=!0;this.initialize(r)}return __extends(i,t),Object.defineProperty(i.prototype,"inputElement",{get:function(){return this._tbx},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"inputType",{get:function(){return this._tbx.type},set:function(t){this._tbx.type=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"value",{get:function(){return this._value},set:function(t){t=n.asDate(t,!this.isRequired);t&&(this._min!=null&&this._getTime(t)<this._getTime(this._min)&&(t=n.DateTime.fromDateTime(t,this._min)),this._max!=null&&this._getTime(t)>this._getTime(this._max)&&(t=n.DateTime.fromDateTime(t,this._max)));this._setText(t?n.Globalize.format(t,this.format):'',!0);t==this._value||n.DateTime.equals(t,this._value)||(this._value=t,this.onValueChanged())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"text",{get:function(){return this._tbx.value},set:function(n){n!=this.text&&(this._setText(n,!0),this._commitText())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"min",{get:function(){return this._min},set:function(t){this._min=n.asDate(t,!0);this.isDroppedDown=!1;this._updateItems()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"max",{get:function(){return this._max},set:function(t){this._max=n.asDate(t,!0);this.isDroppedDown=!1;this._updateItems()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"step",{get:function(){return this._step},set:function(t){this._step=n.asNumber(t,!0);this.isDroppedDown=!1;this._updateItems()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"format",{get:function(){return this._format},set:function(t){t!=this.format&&(this._format=n.asString(t),this._tbx.value=n.Globalize.format(this.value,this.format),this.collectionView&&this.collectionView.items.length&&this._updateItems())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"mask",{get:function(){return this._msk.mask},set:function(t){this._msk.mask=n.asString(t)},enumerable:!0,configurable:!0}),i.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},i.prototype.refresh=function(){this.isDroppedDown=!1;this._msk.refresh();this._tbx.value=n.Globalize.format(this.value,this.format);this._updateItems()},i.prototype.onSelectedIndexChanged=function(n){this.selectedIndex>-1&&this._commitText();t.prototype.onSelectedIndexChanged.call(this,n)},i.prototype._updateItems=function(){var i=new Date(0,0,0,0,0),r=new Date(0,0,0,23,59,59),u=[],t,f;if(this.min&&i.setHours(this.min.getHours(),this.min.getMinutes(),this.min.getSeconds()),this.max&&r.setHours(this.max.getHours(),this.max.getMinutes(),this.max.getSeconds()),n.isNumber(this.step)&&this.step>0)for(t=i;t<=r;t=n.DateTime.addMinutes(t,this.step))u.push(n.Globalize.format(t,this.format));f=this.text;this.itemsSource=u;this.text=f},i.prototype._getTime=function(n){return n.getHours()*3600+n.getMinutes()*60+n.getSeconds()},i.prototype._keydown=function(i){if(t.prototype._keydown.call(this,i),!i.defaultPrevented)switch(i.keyCode){case n.Key.Enter:this.isDroppedDown||(this._commitText(),this.selectAll());break;case n.Key.Escape:this.text=n.Globalize.format(this.value,this.format);this.selectAll()}},i.prototype._commitText=function(){if(this.text||this.isRequired){var t=n.Globalize.parseDate(this.text,this.format);t?this.value=n.DateTime.fromDateTime(this.value,t):this._tbx.value=n.Globalize.format(this.value,this.format)}else this.value=null},i}(t.ComboBox);t.InputTime=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(i){function r(r,u){var f=this,e,o;i.call(this,r);n.addClass(this.hostElement,'wj-inputdatetime');this._btnTm=this.hostElement.querySelector('[wj-part="btn-tm"]');this._format='g';this._inputTime=new t.InputTime(document.createElement('div'));this._inputTime.valueChanged.addHandler(function(){f.value=n.DateTime.fromDateTime(f.value,f._inputTime.value);f.containsFocus()&&(f.isTouching&&f.showDropDownButton||f.selectAll())});e=this._inputTime.dropDown;o=this._keydown.bind(this);this.addEventListener(e,'keydown',o,!0);this.addEventListener(e,'blur',function(){f._updateFocusState()},!0);this.addEventListener(this._btnTm,'click',this._btnclick.bind(this));this.addEventListener(this._btn,'mousedown',function(){f._setDropdown(f.calendar.hostElement)});this.addEventListener(this._btnTm,'mousedown',function(n){f.isDroppedDown&&f.dropDown==e&&n.preventDefault();f._inputTime.dropDownCssClass=f.dropDownCssClass;f._setDropdown(e)});this.initialize(u)}return __extends(r,i),Object.defineProperty(r.prototype,"timeMin",{get:function(){return this._inputTime.min},set:function(n){this._inputTime.min=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"timeMax",{get:function(){return this._inputTime.max},set:function(n){this._inputTime.max=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"timeFormat",{get:function(){return this._inputTime.format},set:function(n){this._inputTime.format=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"timeStep",{get:function(){return this._inputTime.step},set:function(n){this._inputTime.step=n},enumerable:!0,configurable:!0}),r.prototype.refresh=function(){i.prototype.refresh.call(this);this._inputTime.refresh()},r.prototype._updateBtn=function(){i.prototype._updateBtn.call(this);this._btnTm&&(this._btnTm.tabIndex=this._btn.tabIndex,this._btnTm.parentElement.style.display=this._btn.style.display)},r.prototype._clamp=function(n){return n&&(this.min&&n<this.min&&(n=this.min),this.max&&n>this.max&&(n=this.max)),n},r.prototype._commitText=function(){var i=this._tbx.value,t;i||this.isRequired?(t=n.Globalize.parseDate(i,this.format),t?this.value=t:this._tbx.value=n.Globalize.format(this.value,this.format)):this.value=null},r.prototype._setDropdown=function(n){this._dropDown!=n&&(this.isDroppedDown&&(this.isDroppedDown=!1),this._dropDown=n)},r.prototype._updateDropDown=function(){var n=this._inputTime;this._dropDown==n.dropDown?(this._commitText(),i.prototype._updateDropDown.call(this),n.isRequired=this.isRequired,n.value=this.value,this.isDroppedDown&&n.listBox.showSelection()):i.prototype._updateDropDown.call(this)},r.controlTemplate='<div style="position:relative" class="wj-template"><div class="wj-input"><div class="wj-input-group wj-input-btn-visible"><input wj-part="input" type="text" class="wj-form-control" /><span class="wj-input-group-btn" tabindex="-1"><button wj-part="btn" class="wj-btn wj-btn-default" type="button" tabindex="-1"><span class="wj-glyph-calendar"><\/span><\/button><button wj-part="btn-tm" class="wj-btn wj-btn-default" type="button" tabindex="-1"><span class="wj-glyph-clock"><\/span><\/button><\/span><\/div><\/div><div wj-part="dropdown" class="wj-content wj-dropdown-panel" style="display:none;position:absolute;z-index:100;width:auto"><\/div><\/div>',r}(t.InputDate);t.InputDateTime=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){var u=this,e,f;t.call(this,i);this._showBtn=!0;this._readOnly=!1;this.textChanged=new n.Event;this.valueChanged=new n.Event;e=this.getTemplate();this.applyTemplate('wj-control wj-inputnumber wj-content',e,{_tbx:'input',_btnUp:'btn-inc',_btnDn:'btn-dec'},'input');f=this._tbx;f.autocomplete='off';f.spellcheck=!1;this._updateSymbols();this.addEventListener(this._tbx,'compositionstart',function(){u._composing=!0});this.addEventListener(this._tbx,'compositionend',function(){u._composing=!1;setTimeout(function(){u._setText(u.text)})});this.addEventListener(f,'keypress',this._keypress.bind(this));this.addEventListener(f,'keydown',this._keydown.bind(this));this.addEventListener(f,'input',this._input.bind(this));this.addEventListener(this._btnUp,'click',this._clickSpinner.bind(this));this.addEventListener(this._btnDn,'click',this._clickSpinner.bind(this));this.addEventListener(this.hostElement,'wheel',function(t){if(!t.defaultPrevented&&!u.isReadOnly&&u.containsFocus()&&u.value!=null){var i=n.clamp(-t.deltaY,-1,1);u._increment((u.step||1)*i);setTimeout(function(){return u.selectAll()});t.preventDefault()}});this.value=0;this.isRequired=!0;this.initialize(r)}return __extends(i,t),Object.defineProperty(i.prototype,"inputElement",{get:function(){return this._tbx},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"inputType",{get:function(){return this._tbx.type},set:function(t){this._tbx.type=n.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"value",{get:function(){return this._value},set:function(t){if(t!=this._value)if(t=n.asNumber(t,!this.isRequired||t==null&&this._value==null),t==null)this._setText('');else if(!isNaN(t)){var i=n.Globalize.format(t,this.format);this._setText(i)}},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isRequired",{get:function(){return this._tbx.required},set:function(t){this._tbx.required=n.asBoolean(t)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"required",{get:function(){return n._deprecated('required','isRequired'),this.isRequired},set:function(t){n._deprecated('required','isRequired');this.isRequired=t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isReadOnly",{get:function(){return this._readOnly},set:function(t){this._readOnly=n.asBoolean(t);this.inputElement.readOnly=this._readOnly;n.toggleClass(this.hostElement,'wj-state-readonly',this.isReadOnly)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"min",{get:function(){return this._min},set:function(t){this._min=n.asNumber(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"max",{get:function(){return this._max},set:function(t){this._max=n.asNumber(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"step",{get:function(){return this._step},set:function(t){this._step=n.asNumber(t,!0);this._updateBtn()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"format",{get:function(){return this._format},set:function(t){t!=this.format&&(this._format=n.asString(t),this.refresh())},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"text",{get:function(){return this._tbx.value},set:function(n){n!=this.text&&(this._oldText=null,this._setText(n))},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"placeholder",{get:function(){return this._tbx.placeholder},set:function(n){this._tbx.placeholder=n},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"showSpinner",{get:function(){return this._showBtn},set:function(t){this._showBtn=n.asBoolean(t);this._updateBtn()},enumerable:!0,configurable:!0}),i.prototype.selectAll=function(){n.setSelectionRange(this._tbx,0,this._tbx.value.length)},i.prototype.onTextChanged=function(n){this._updateState();this.textChanged.raise(this,n)},i.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},i.prototype.onGotFocus=function(n){this.isTouching||(this._tbx.focus(),this.selectAll());t.prototype.onGotFocus.call(this,n)},i.prototype.onLostFocus=function(i){var r=this._clamp(this.value),u=n.Globalize.format(r,this.format,!1,!1);this._setText(u);t.prototype.onLostFocus.call(this,i)},i.prototype.refresh=function(){this._updateSymbols();var t=n.Globalize.format(this.value,this.format);this._setText(t)},i.prototype._updateSymbols=function(){var t=n.culture.Globalize.numberFormat;this._decChar=t['.']||'.';this._currChar=t.currency.symbol||'$';this._rxSym=new RegExp('^[%+\\-() '+this._decChar+this._currChar+']*$')},i.prototype._clamp=function(t){return n.clamp(t,this.min,this.max)},i.prototype._isNumeric=function(n,t){t===void 0&&(t=!1);var i=n==this._decChar||n>='0'&&n<='9';return i||t||(i='+-()'.indexOf(n)>-1),i},i.prototype._getInputRange=function(n){var t;n===void 0&&(n=!1);var i=[0,0],r=this.text,u=!1;for(t=0;t<r.length;t++)this._isNumeric(r[t],n)&&(u||(i[0]=t,u=!0),i[1]=t+1);return i},i.prototype._moveToDigit=function(){var t=this._getInputRange(!0);n.setSelectionRange(this._tbx,t[0],t[1])},i.prototype._increment=function(t){if(t){var i=this._clamp(this.value+t),r=n.Globalize.format(i,this.format,!1,!1);this._setText(r)}},i.prototype._getSelStart=function(){return this._tbx&&this._tbx.value?this._tbx.selectionStart:0},i.prototype._updateBtn=function(){this.showSpinner&&this.step&&this.value!=null?(this._btnUp.style.display=this._btnDn.style.display='',n.addClass(this.hostElement,'wj-input-show-spinner')):(this._btnUp.style.display=this._btnDn.style.display='none',n.removeClass(this.hostElement,'wj-input-show-spinner'))},i.prototype._setText=function(t){var u,i,f,r;if(!this._composing){if(!t){if(!this.isRequired){this._tbx.value='';this._value!=null&&(this._value=null,this.onValueChanged());this._oldText&&(this._oldText=t,this.onTextChanged());this._updateBtn();return}t='0'}if(t=='-'||t=='('){this._tbx.value=t;n.setSelectionRange(this._tbx,1);return}if(t.length>1&&t[t.length-1]==')'&&t[0]!='('&&(t=t.substr(0,t.length-1)),this._rxSym.test(t)&&(t='0'),u=this._format||(t.indexOf(this._decChar)>-1?'n2':'n0'),i=n.Globalize.parseFloat(t,u),isNaN(i)){this._tbx.value=this._oldText;return}t.indexOf('%')<0&&u.toLowerCase().indexOf('p')>-1&&(i/=100);f=this._oldText&&t.length==this._oldText.length+1;r=n.Globalize.format(i,u,!1,f);(u=='n'||u[0].toLowerCase()=='g')&&this._tbx.selectionStart==this._tbx.value.length&&(t==r+this._decChar||t==r+this._decChar+'0')&&(r=t);this._tbx.value!=r&&(this._tbx.value=r,i=n.Globalize.parseFloat(r,this.format));i!=this._value&&(this._value=i,this.onValueChanged());this.text!=this._oldText&&(this.onTextChanged(),this._oldText=this.text);this._updateBtn()}},i.prototype._keypress=function(t){var r,u,i;if(!t.defaultPrevented&&!this._composing&&!this._readOnly&&t.charCode&&!t.ctrlKey){r=String.fromCharCode(t.charCode);this._isNumeric(r)?(u=this._getInputRange(!0),this._tbx.selectionStart<u[0]&&n.setSelectionRange(this._tbx,u[0],u[1])):t.preventDefault();switch(r){case'-':this.value?(this.value*=-1,this._moveToDigit()):this._setText('-');t.preventDefault();break;case'+':this.value=Math.abs(this.value);this._moveToDigit();t.preventDefault();break;case this._decChar:i=this._tbx.value.indexOf(r);i>-1&&(this._getSelStart()<=i&&i++,n.setSelectionRange(this._tbx,i),t.preventDefault())}}},i.prototype._keydown=function(t){var r=this,i;if(!t.defaultPrevented&&!this._composing)switch(t.keyCode){case n.Key.Up:case n.Key.Down:this.step&&(this._increment(this.step*(t.keyCode==n.Key.Up?1:-1)),setTimeout(function(){r.selectAll()}),t.preventDefault());break;case n.Key.Back:this._tbx&&this._tbx.selectionStart==this._tbx.selectionEnd&&(i=this._tbx.selectionStart,i>0&&this.text[i-1]==this._decChar&&(setTimeout(function(){n.setSelectionRange(r._tbx,i-1)}),t.preventDefault()));break;case n.Key.Delete:this._tbx&&this._tbx.selectionStart==this._tbx.selectionEnd&&(i=this._tbx.selectionStart,i>0&&this.text[i]==this._decChar&&(setTimeout(function(){n.setSelectionRange(r._tbx,i+1)}),t.preventDefault()))}},i.prototype._input=function(){var t=this;this._composing||setTimeout(function(){var o=t._tbx,r=o.value,i=t._getSelStart(),s=r?r.indexOf(t._decChar):-1,f,u,e;t._setText(r);t.containsFocus()&&(f=o.value,u=f.indexOf(t._decChar),r&&r[0]=='-'&&f&&f[0]!='-'&&(r=null),r?i<=s&&u>-1||s<0&&u<0?i+=f.length-r.length:i==r.length&&s<0&&u>-1&&(i=u):i=u>-1?u:f.match(/[^\d]*$/).index,e=t._getInputRange(),i<e[0]&&(i=e[0]),i>e[1]&&(i=e[1]),n.setSelectionRange(o,i))})},i.prototype._clickSpinner=function(t){var i=this;t.defaultPrevented||this.isReadOnly||!this.step||this.value==null||(this._increment(this.step*(n.contains(this._btnUp,t.target)?1:-1)),this.isTouching||setTimeout(function(){return i.selectAll()}))},i.controlTemplate='<div class="wj-input"><div class="wj-input-group"><span wj-part="btn-dec" class="wj-input-group-btn" tabindex="-1"><button class="wj-btn wj-btn-default" type="button" tabindex="-1">-<\/button><\/span><input type="tel" wj-part="input" class="wj-form-control wj-numeric"/><span wj-part="btn-inc" class="wj-input-group-btn" tabindex="-1"><button class="wj-btn wj-btn-default" type="button" tabindex="-1">+<\/button><\/span><\/div>',i}(n.Control);t.InputNumber=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(t){function i(i,r){var e=this,f,u;t.call(this,i);this.valueChanged=new n.Event;f=this.getTemplate();this.applyTemplate('wj-control wj-inputmask wj-content',f,{_tbx:'input'},'input');this._orgTag=='INPUT'&&(u=this._tbx.getAttribute('value'),u&&(this.value=u));this._msk=new n._MaskProvider(this._tbx);this.isRequired=!0;this.initialize(r);this.addEventListener(this._tbx,'input',function(){setTimeout(function(){e.onValueChanged()})})}return __extends(i,t),Object.defineProperty(i.prototype,"inputElement",{get:function(){return this._tbx},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"value",{get:function(){return this._tbx.value},set:function(t){if(t!=this.value){this._tbx.value=n.asString(t);var i=n.getActiveElement();this._tbx.selectionStart=this._tbx.value.length;i&&i!=n.getActiveElement()&&i.focus();t=this._msk._applyMask();this._tbx.value=t;this.onValueChanged()}},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"rawValue",{get:function(){return this._msk.getRawValue()},set:function(n){this.value=n},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"mask",{get:function(){return this._msk.mask},set:function(t){var i=this.value;this._msk.mask=n.asString(t);this.value!=i&&this.onValueChanged()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"promptChar",{get:function(){return this._msk.promptChar},set:function(n){var t=this.value;this._msk.promptChar=n;this.value!=t&&this.onValueChanged()},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"placeholder",{get:function(){return this._tbx.placeholder},set:function(n){this._tbx.placeholder=n},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"maskFull",{get:function(){return this._msk.maskFull},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"isRequired",{get:function(){return this._tbx.required},set:function(t){this._tbx.required=n.asBoolean(t)},enumerable:!0,configurable:!0}),i.prototype.selectAll=function(){var t=this._msk.getMaskRange();n.setSelectionRange(this._tbx,t[0],t[1]+1)},i.prototype.onValueChanged=function(n){this._updateState();this.valueChanged.raise(this,n)},i.prototype.refresh=function(n){t.prototype.refresh.call(this,n);this._msk.refresh()},i.prototype.onGotFocus=function(n){t.prototype.onGotFocus.call(this,n);this.selectAll()},i.controlTemplate='<div class="wj-input"><div class="wj-input-group"><input wj-part="input" class="wj-form-control"/><\/div>',i}(n.Control);t.InputMask=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}));__extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},function(n){var t;(function(t){'use strict';var i=function(i){function r(t,r){var u=this;i.call(this,t);this.valueChanged=new n.Event;n.addClass(this.hostElement,'wj-inputcolor');this._tbx.style.paddingLeft='24px';this._ePreview=n.createElement('<div class="wj-inputcolorbox" style="position:absolute;left:6px;top:6px;width:12px;bottom:6px;border:1px solid black"></div>');this.hostElement.style.position='relative';this.hostElement.appendChild(this._ePreview);this._orgTag=='INPUT'&&(this._tbx.type='',this._commitText());this.value='#ffffff';this.isRequired=!0;this.initialize(r);this.addEventListener(this._colorPicker.hostElement,'click',function(t){var i=t.target,r;i&&i.tagName=='DIV'&&(n.closest(i,'[wj-part="div-pal"]')||n.closest(i,'[wj-part="div-pv"]'))&&(r=i.style.backgroundColor,r&&(u.isDroppedDown=!1))})}return __extends(r,i),Object.defineProperty(r.prototype,"value",{get:function(){return this._value},set:function(t){t!=this.value&&(t||!this.isRequired)&&(this.text=n.asString(t))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"text",{get:function(){return this._tbx.value},set:function(t){t!=this.text&&(this._setText(n.asString(t),!0),this._commitText())},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"showAlphaChannel",{get:function(){return this._colorPicker.showAlphaChannel},set:function(n){this._colorPicker.showAlphaChannel=n},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"colorPicker",{get:function(){return this._colorPicker},enumerable:!0,configurable:!0}),r.prototype.onValueChanged=function(n){this.valueChanged.raise(this,n)},r.prototype._createDropDown=function(){var i=this;this._colorPicker=new t.ColorPicker(this._dropDown);n.setCss(this._dropDown,{minWidth:420,minHeight:200});this._colorPicker.valueChanged.addHandler(function(){i.value=i._colorPicker.value})},r.prototype._keydown=function(t){if(!t.defaultPrevented)switch(t.keyCode){case n.Key.Enter:this._commitText();this.selectAll();break;case n.Key.Escape:this.text=this.value;this.selectAll()}i.prototype._keydown.call(this,t)},r.prototype._commitText=function(){if(this.value!=this.text){if(!this.isRequired&&!this.text){this._value=this.text;this._ePreview.style.backgroundColor='';return}var t=n.Color.fromString(this.text);t?(this._colorPicker.value=this.text,this._value=this._colorPicker.value,this._ePreview.style.backgroundColor=this.value,this.onValueChanged()):this.text=this._value?this._value:''}},r}(t.DropDown);t.InputColor=i})(t=n.input||(n.input={}))}(wijmo||(wijmo={}))
;
(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
//create and bind Wijmo 5 FlexGrid
var myFlexGrid = new wijmo.grid.FlexGrid('#myFlexGrid');
myFlexGrid.initialize({
  autoGenerateColumns: false,
  itemsSource: cv,
  isReadOnly: true,
  selectionMode: wijmo.grid.SelectionMode.Row,
  headersVisibility: wijmo.grid.HeadersVisibility.Column,
  columns: [
    {
      binding: 'Id',
      width: '*'
    },
    {
      binding: 'Country',
      width: '*'
    },
    {
      binding: 'Date',
      width: '*'
    },
    {
      binding: 'Amount',
      format: 'c0',
      width: '*'
    },
    {
      binding: 'Active',
      width: '*'
    }
  ]
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//








;
