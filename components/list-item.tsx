import { PageModel } from 'containers/page'
import Link from 'next/link'
import IconArrowRight from 'heroicons/react/outline/ChevronRight'
import IconPlus from 'heroicons/react/outline/Plus'
import { FC, HTMLProps, ReactText } from 'react'
import cx from 'classnames'

const Button: FC<HTMLProps<HTMLSpanElement>> = ({
  children,
  className,
  ...attrs
}) => {
  return (
    <span
      {...attrs}
      className={cx('p-0.5 rounded hover:bg-gray-300', className)}
    >
      {children}
    </span>
  )
}

export const ListItem: FC<
  HTMLProps<HTMLLIElement> & {
    item: PageModel
    innerRef: (el: HTMLElement | null) => void
    onExpand: (itemId?: ReactText) => void
    onCollapse: (itemId?: ReactText) => void
    isExpanded: boolean
    snapshot: {
      isDragging: boolean
    }
  }
> = ({
  item,
  innerRef,
  onExpand,
  onCollapse,
  isExpanded,
  snapshot,
  ...attrs
}) => {
  return (
    <li
      {...attrs}
      ref={innerRef}
      className={cx('group hover:bg-gray-200', {
        'bg-gray-200': snapshot.isDragging,
      })}
    >
      <Link href={`/page/${item.id}`}>
        <a className="flex py-1.5 px-4 items-center ">
          <Button
            className="mr-0.5"
            onClick={(e) => {
              e.preventDefault()
              isExpanded ? onCollapse(item.id) : onExpand(item.id)
            }}
          >
            <IconArrowRight
              className={cx('transition-transform transform', {
                'rotate-90': isExpanded,
              })}
              width="16"
              height="16"
            />
          </Button>
          <span className="flex-grow truncate">{item.title || 'Untitled'}</span>
          <Button className="opacity-0 group-hover:opacity-100">
            <IconPlus width="16" height="16" />
          </Button>
        </a>
      </Link>
    </li>
  )
}
