import * as React from 'react'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Breadcrumbs, Header, Search } from 'react-notion-x'

import { isSearchEnabled, headerNavigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'
import { NavigationLinks } from './NavigationLinks'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    console.log('onToggleTheme')
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
      title='Dark / Light Mode'
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

export const NotionPageHeader: React.FC<{ block: types.CollectionViewPageBlock | types.PageBlock }> = ({ block }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />
        <NavigationLinks navigationLinks={headerNavigationLinks}
            classNames={`navbar-links breadcrumbs ${isMenuOpen ? 'open' : ''}`}>
            <ToggleThemeButton />
            {isSearchEnabled && <Search block={block} title={'Search on the whole site'} />}
        </NavigationLinks>
        <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} >
          <span className="bar"/>
          <span className="bar"/>
          <span className="bar"/>
        </div>
      </div>
    </header>
  )
}
