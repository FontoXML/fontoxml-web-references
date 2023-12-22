import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

import {
	CompactStateMessage,
	Popover,
	PopoverBody,
	PopoverFooter,
	SpinnerIcon,
	Text,
	TextLink,
} from 'fontoxml-design-system/src/components';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import type { NodeId } from 'fontoxml-dom-identification/src/types';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import useXPath from 'fontoxml-fx/src/useXPath';
import t from 'fontoxml-localization/src/t';
import type { OperationName } from 'fontoxml-operations/src/types';
import ReturnTypes from 'fontoxml-selectors/src/ReturnTypes';
import type { XPathQuery, XQExpression } from 'fontoxml-selectors/src/types';
import xq, { ensureXQExpression } from 'fontoxml-selectors/src/xq';

/**
 * @fontosdk
 */
type Props = {
	/**
	 * @fontosdk
	 */
	data: {
		/**
		 * @remarks
		 * A property that comes from the popover method self, contains the node
		 * ID of the node that is configured. Does not need to be added in the
		 * popoverData.
		 *
		 * @fontosdk
		 */
		contextNodeId: NodeId;
		/**
		 * @remarks
		 * The operation for removing the reference. Is by default {@link
		 * reference-delete}.
		 *
		 * @fontosdk
		 */
		deleteOperationName?: OperationName;
		/**
		 * @remarks
		 * Only when an editOperationName is used, a edit button is made. The
		 * edit operation should provide a way to edit the reference.
		 *
		 * @fontosdk
		 */
		editOperationName?: OperationName;
		/**
		 * @remarks
		 * Automatically set to true if the popover is opened in a read-only
		 * context, meaning either the reference is read-only or it is shown in
		 * a preview.
		 *
		 * @fontosdk
		 */
		isReadOnly?: boolean;
		/**
		 * @remarks
		 * Determines the reference content with a xpath query, starting from
		 * the context node. Often this is just an attribute, for example
		 * `@href`.
		 *
		 * @fontosdk
		 */
		targetQuery: XPathQuery | XQExpression;
		/**
		 * @remarks
		 * Determines whether the result of the targetQuery should be resolved
		 * through the reference pipeline before it is displayed.
		 *
		 * Defaults to false
		 *
		 * @fontosdk
		 *
		 * @deprecated the reference pipeline will be removed in 8.10
		 */
		targetIsPermanentId?: boolean;
	};
};

/**
 * A popover used for web references.
 *
 * @remarks
 *
 * This popover is registered under the name `WebReferencePopover` and can be
 * used directly in family configuration by configuring
 * `visualization.popoverComponentName` and `visualization.popoverData` for any
 * reference element in a `configureSxModule.ts`:
 *
 * ```javascript
 * configureAsInlineLink(sxModule, xq`self::xref[@format="html"]`, 'hyperlink', {
 *     popoverComponentName: 'WebReferencePopover',
 *     popoverData: {
 *         editOperationName: 'dita-web-reference-edit',
 *         targetQuery: xq`@href`
 *     },
 * 	   referenceQuery: xq`@href`,
 * });
 * ```
 *
 * @fontosdk
 */
const WebReferencePopover: FC<Props> = ({ data }) => {
	const contextNode = useMemo(
		() => documentsManager.getNodeById(data.contextNodeId),
		[data.contextNodeId]
	);

	const targetQuery = data.targetIsPermanentId
		? xq`${ensureXQExpression(
				data.targetQuery
		  )} ! fonto:resolve-permanent-id(.)?value?target`
		: data.targetQuery;

	const target = useXPath<string>(targetQuery, contextNode, {
		expectedResultType: ReturnTypes.STRING,
	});

	const editDeleteOperationData = useMemo(
		() => ({ contextNodeId: data.contextNodeId }),
		[data.contextNodeId]
	);

	const openPreview = useCallback(() => {
		if (!target) {
			return;
		}
		window.open(target);
	}, [target]);

	return (
		<Popover maxWidth="500px" minWidth="220px">
			{!target && (
				<PopoverBody>
					<CompactStateMessage
						message={t('Loading reference')}
						visual={<SpinnerIcon size="s" />}
					/>
				</PopoverBody>
			)}
			{target && (
				<PopoverBody>
					<Text colorName="text-muted-color">
						{t('Hyperlink to:')}
					</Text>
					<TextLink label={target} onClick={openPreview} />
				</PopoverBody>
			)}

			{!data.isReadOnly && data.contextNodeId && (
				<PopoverFooter>
					<FxOperationButton
						operationName={
							data.deleteOperationName ?? 'reference-delete'
						}
						operationData={editDeleteOperationData}
						focusEditorWhenDone
					/>

					{data.editOperationName && (
						<FxOperationButton
							type="primary"
							operationName={data.editOperationName}
							operationData={editDeleteOperationData}
							focusEditorWhenDone
						/>
					)}
				</PopoverFooter>
			)}
		</Popover>
	);
};

export default WebReferencePopover;
